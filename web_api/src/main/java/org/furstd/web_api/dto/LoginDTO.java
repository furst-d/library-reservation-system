package org.furstd.web_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginDTO {
    @NotBlank(message = "Email cannot be null or blank")
    @Email(message = "Email must be a valid email address")
    private String email;

    @NotBlank(message = "Password cannot be null or blank")
    @Size(min = 4, max = 255, message = "Password must be between 4 and 255 characters")
    private String password;
}
