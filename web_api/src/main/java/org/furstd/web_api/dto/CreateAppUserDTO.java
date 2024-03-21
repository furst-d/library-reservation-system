package org.furstd.web_api.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Getter
@AllArgsConstructor
public class CreateAppUserDTO {
    @NotBlank(message = "Email cannot be null or blank")
    @Email(message = "Email must be a valid email address")
    @Size(max = 255, message = "Email cannot exceed 255 characters")
    private String email;

    @NotBlank(message = "Password cannot be null or blank")
    @Size(min = 4, max = 255, message = "Password must be between 4 and 255 characters")
    private String password;

    @NotBlank(message = "First name cannot be null or blank")
    @Size(max = 255, message = "First name cannot exceed 255 characters")
    private String firstName;

    @NotBlank(message = "Last name cannot be null or blank")
    @Size(max = 255, message = "Last name cannot exceed 255 characters")
    private String lastName;

    @NotNull(message = "Birth date cannot be null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date birthDate;

    @NotEmpty(message = "Roles cannot be null or empty")
    private final List<String> roles;
}
