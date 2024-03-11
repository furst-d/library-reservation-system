package org.furstd.web_api.dto;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@AllArgsConstructor
public class ReservationDTO {
    @PositiveOrZero(message = "User id must be a positive number")
    private int userId;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date reservationDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date returnDate;
}
