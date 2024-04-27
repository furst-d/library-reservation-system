package org.furstd.web_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BookDTO {
    @NotBlank(message = "Title cannot be null or blank")
    @Size(max = 255, message = "Title cannot exceed 255 characters")
    private String title;

    @Positive(message = "Author id must be a positive number")
    private int authorId;

    @Positive(message = "Genre id must be a positive number")
    private int genreId;

    @Positive(message = "Language id must be a positive number")
    private int languageId;

    @Positive(message = "Pages must be a positive number")
    private int pages;

    @Positive(message = "Publication year must be a positive number")
    private int publicationYear;

    @Positive(message = "Quantity must be a positive number")
    private int quantity;

    @Positive(message = "Available quantity must be a positive number")
    private int availableQuantity;

    @NotBlank(message = "Cover image link cannot be null or blank")
    @Size(max = 255, message = "Cover image link cannot exceed 255 characters")
    private String coverImageLink;
}
