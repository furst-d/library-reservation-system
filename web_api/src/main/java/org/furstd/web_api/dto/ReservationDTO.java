package org.furstd.web_api.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Getter
@AllArgsConstructor
public class ReservationDTO {
    @Positive(message = "User id must be a positive number")
    private int userId;

    @NotNull(message = "Reservation date cannot be null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date reservationDate;

    @NotNull(message = "Return date cannot be null")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date returnDate;

    @NotEmpty(message = "Book IDs cannot be null or empty")
    private final List<Integer> bookIds;
}
