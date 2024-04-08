package org.furstd.web_api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChangePasswordDTO {
    @NotBlank(message = "Old password cannot be null or blank")
    @Size(min = 4, max = 255, message = "Old password must be between 4 and 255 characters")
    private String oldPassword;

    @NotBlank(message = "New password cannot be null or blank")
    @Size(min = 4, max = 255, message = "New password must be between 4 and 255 characters")
    private String newPassword;
}
