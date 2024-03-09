package org.furstd.web_api.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@Getter
public class BaseException extends RuntimeException {
    private final HttpStatus status;
    private final ZonedDateTime timestamp;

    public BaseException(HttpStatus status, String message) {
        super(message);
        this.status = status;
        this.timestamp = ZonedDateTime.now();
    }

}
