package org.furstd.web_api.controller;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.ReservationDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.entity.Role;
import org.furstd.web_api.exceptions.ForbiddenException;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.service.book.IBookService;
import org.furstd.web_api.service.reservation.IReservationService;
import org.furstd.web_api.service.role.IRoleService;
import org.furstd.web_api.service.user.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RequestMapping("reservations")
@RestController
@RequiredArgsConstructor
public class ReservationController {
    private final IReservationService reservationService;
    private final IBookService bookService;
    private final IUserService userService;

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

    @PostMapping("")
    public ResponseEntity<Object> createReservation(@RequestBody ReservationDTO reservationDTO) {
        AppUser user = userService.findById(reservationDTO.getUserId())
                .orElseThrow(() -> new NotFoundException("User not found!"));

        reservationService.createReservation(user, reservationDTO.getBookIds(), reservationDTO.getReservationDate(), reservationDTO.getReturnDate());
        return ResponseEntity.status(HttpStatus.CREATED).body(new Msg("Reservation was created successfully!"));
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> updateReservation(@PathVariable int id, @RequestBody ReservationDTO reservationDTO) {
        Reservation reservation = reservationService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));

        List<Book> books = bookService.findByIds(reservationDTO.getBookIds());
        if (books.isEmpty()) {
            throw new NotFoundException("Books not found!");
        }

        reservationService.checkDates(reservationDTO.getReservationDate(), reservationDTO.getReturnDate());

        reservation.setReservationDate(reservationDTO.getReservationDate());
        reservation.setReturnDate(reservationDTO.getReturnDate());
        reservation.setBooks(books);

        reservationService.updateReservation(reservation);
        return ResponseEntity.ok(new Msg("Reservation was updated successfully!"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteReservation(@PathVariable int id) {
        Reservation reservation = reservationService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));

        reservationService.deleteReservation(reservation);
        return ResponseEntity.ok(new Msg("Reservation was deleted successfully!"));
    }
}
