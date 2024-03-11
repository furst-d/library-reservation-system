package org.furstd.web_api.dto;

import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@AllArgsConstructor
public class AuthorDTO {
    @Size(max = 255, message = "First name cannot exceed 255 characters")
    private String firstName;

    @Size(max = 255, message = "Last name cannot exceed 255 characters")
    private String lastName;

    @PositiveOrZero
    private int nationalityId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthDate;
}
