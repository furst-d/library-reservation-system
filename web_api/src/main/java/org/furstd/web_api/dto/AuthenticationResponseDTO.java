package org.furstd.web_api.dto;

import lombok.*;
import org.furstd.web_api.entity.AppUser;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class AuthenticationResponseDTO {
    private String token;
    private AppUser user;
}
