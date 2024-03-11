package org.furstd.web_api.dto;

import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BookDTO {
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    @PositiveOrZero(message = "Author id must be a positive number")
    private int authorId;

    @PositiveOrZero(message = "Genre id must be a positive number")
    private int genreId;

    @PositiveOrZero(message = "Language id must be a positive number")
    private int languageId;

    @PositiveOrZero(message = "Pages must be a positive number")
    private int pages;

    @PositiveOrZero(message = "Publication year must be a positive number")
    private int publicationYear;

    @PositiveOrZero(message = "Quantity must be a positive number")
    private int quantity;
}
