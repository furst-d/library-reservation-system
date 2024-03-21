package org.furstd.web_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@AllArgsConstructor
public class AuthorDTO {
    @NotBlank(message = "First name cannot be null or blank")
    @Size(max = 255, message = "First name cannot exceed 255 characters")
    private String firstName;

    @NotBlank(message = "Last name cannot be null or blank")
    @Size(max = 255, message = "Last name cannot exceed 255 characters")
    private String lastName;

    @Positive
    private int nationalityId;

    @NotBlank(message = "Birth date cannot be null or blank")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthDate;
}
