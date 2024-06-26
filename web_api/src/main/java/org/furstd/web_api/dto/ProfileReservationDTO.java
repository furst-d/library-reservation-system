package org.furstd.web_api.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileReservationDTO {
    @NotEmpty(message = "Book IDs cannot be null or empty")
    private List<Integer> bookIds;
}
