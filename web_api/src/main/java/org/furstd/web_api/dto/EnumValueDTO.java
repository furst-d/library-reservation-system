package org.furstd.web_api.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class EnumValueDTO {
    private int id;
    private String label;
}
