package org.furstd.web_api.controller;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.ReservationDTO;
import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.service.reservation.IReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("reservations")
@RestController
@RequiredArgsConstructor
public class ReservationController {
    private final IReservationService reservationService;

    private static final String NOT_FOUND_MESSAGE = "Reservation not found!";

    @RequestMapping("")
    public ResponseEntity<Object> getReservations() {
        return ResponseEntity.ok(reservationService.findAll());
    }

    @RequestMapping("{id}")
    public ResponseEntity<Object> getReservation(@PathVariable int id) {
        return ResponseEntity.ok(reservationService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE)));
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> updateReservation(@PathVariable int id, @RequestBody ReservationDTO reservationDTO) {
        Reservation reservation = reservationService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));

        if (reservationDTO.getReservationDate() != null) {
            reservation.setReservationDate(reservationDTO.getReservationDate());
        }

        if (reservationDTO.getReturnDate() != null) {
            reservation.setReturnDate(reservationDTO.getReturnDate());
        }

        reservationService.updateReservation(reservation);
        return ResponseEntity.ok(new Msg("Author was updated successfully!"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteReservation(@PathVariable int id) {
        Reservation reservation = reservationService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));

        reservationService.deleteReservation(reservation);
        return ResponseEntity.ok(new Msg("Reservation was deleted successfully!"));
    }
}
