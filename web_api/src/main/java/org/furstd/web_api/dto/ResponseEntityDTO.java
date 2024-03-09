package org.furstd.web_api.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseEntityDTO<T> {
    private String status;
    private int code;
    private T payload;

    public ResponseEntityDTO(T payload, int code) {
        this.status = "ok";
        this.code = code;
        this.payload = payload;
    }
}
