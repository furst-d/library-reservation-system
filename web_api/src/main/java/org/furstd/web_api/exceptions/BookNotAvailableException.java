package org.furstd.web_api.exceptions;

import lombok.Getter;
import org.furstd.web_api.entity.Book;

@Getter
public class BookNotAvailableException extends ConflictException {
    public BookNotAvailableException(Book conflictedBook, String message) {
        super(message, conflictedBook);
    }
}
