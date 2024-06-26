package org.furstd.web_api.advice;

import jakarta.servlet.http.HttpServletRequest;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.exceptions.BaseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<Object> handleCustomException(BaseException ex, HttpServletRequest request) {
        request.setAttribute("exceptionHandled", Boolean.TRUE);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("status", "error");
        body.put("code", ex.getStatus().value());

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("message", new Msg(ex.getMessage()));
        if (ex.getData() != null) {
            payload.put("data", ex.getData());
        }
        body.put("payload", payload);

        return new ResponseEntity<>(body, ex.getStatus());
    }
}
