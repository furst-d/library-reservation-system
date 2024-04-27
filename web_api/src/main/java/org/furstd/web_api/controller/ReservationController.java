package org.furstd.web_api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.dto.ReservationDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Penalty;
import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.service.book.IBookService;
import org.furstd.web_api.service.reservation.ReservationService;
import org.furstd.web_api.service.user.IUserService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("reservations")
@RestController
@RequiredArgsConstructor
public class ReservationController extends BaseController<Reservation> {
    private final ReservationService reservationService;
    private final IBookService bookService;
    private final IUserService userService;

    private static final String NOT_FOUND_MESSAGE = "Reservation not found!";

    @RequestMapping("")
    public ResponseEntity<Object> getReservations(@RequestParam(required = false) String filters,
                                           @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) throws JsonProcessingException {
        Specification<Reservation> spec = this.processFilters(filters, reservationService);
        ListResponseDTO<Reservation> reservationListDTO = reservationService.findAll(spec, pageable);
        return ResponseEntity.ok(reservationListDTO);
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
        reservation.setReturnedAt(reservationDTO.getReturnedAt());
        reservation.setBooks(books);

        if (reservationDTO.getPenaltyAmountCzk() == 0) {
            if (reservation.getPenalty() != null) {
                reservation.setPenalty(null);
            }
        } else {
            Penalty penalty;
            if (reservation.getPenalty() != null) {
                penalty = reservation.getPenalty();
            } else {
                penalty = new Penalty();
            }

            penalty.setAmountCzk(reservationDTO.getPenaltyAmountCzk());
            penalty.setCreationDate(reservationDTO.getPenaltyCreationDate());
            if (reservationDTO.getPenaltyPaymentDate() != null) {
                penalty.setPaymentDate(reservationDTO.getPenaltyPaymentDate());
                penalty.setPaid(true);
            } else {
                penalty.setPaid(false);
            }
            reservation.setPenalty(penalty);
        }

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
