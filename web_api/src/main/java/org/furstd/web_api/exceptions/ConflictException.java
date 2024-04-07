package org.furstd.web_api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ConflictException extends BaseException {
    public ConflictException(String message, Object data) {
        super(HttpStatus.CONFLICT, message, data);
    }
}
