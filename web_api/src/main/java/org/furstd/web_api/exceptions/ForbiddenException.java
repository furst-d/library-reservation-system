package org.furstd.web_api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class ForbiddenException extends BaseException {
    public ForbiddenException(String message) {
        super(HttpStatus.FORBIDDEN, message, null);
    }
}
