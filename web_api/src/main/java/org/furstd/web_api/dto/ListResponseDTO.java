package org.furstd.web_api.dto;

import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ListResponseDTO<D> {
    private long totalCount;
    private List<D> data;
}
