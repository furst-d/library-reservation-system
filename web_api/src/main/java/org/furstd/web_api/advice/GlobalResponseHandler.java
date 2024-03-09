package org.furstd.web_api.advice;

import jakarta.servlet.http.HttpServletRequest;
import org.furstd.web_api.dto.ResponseEntityDTO;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

@ControllerAdvice
public class GlobalResponseHandler implements ResponseBodyAdvice<Object> {
    @Override
    public boolean supports(
            @NonNull MethodParameter returnType,
            @NonNull Class<? extends HttpMessageConverter<?>> converterType
    ) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(
            Object body,
            @NonNull MethodParameter returnType,
            @NonNull MediaType selectedContentType,
            @NonNull Class<? extends HttpMessageConverter<?>> selectedConverterType,
            @NonNull ServerHttpRequest request, @NonNull ServerHttpResponse response) {
        if (request instanceof ServletServerHttpRequest servletServerRequest
        ) {
            HttpServletRequest servletRequest = servletServerRequest.getServletRequest();
            // Ověření, zda byla výjimka zachycena
            if (Boolean.TRUE.equals(servletRequest.getAttribute("exceptionHandled"))) {
                // Pokud ano, vrátíme tělo beze změny
                return body;
            }
        }

        HttpStatus status = HttpStatus.OK;
        if (response instanceof ServletServerHttpResponse servletServerHttpResponse) {
            status = HttpStatus.valueOf(servletServerHttpResponse.getServletResponse().getStatus());
        }

        return new ResponseEntityDTO<>(body, status.value());
    }
}
