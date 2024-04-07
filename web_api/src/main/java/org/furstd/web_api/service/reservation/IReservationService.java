package org.furstd.web_api.service.reservation;

import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Reservation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IReservationService {

    ListResponseDTO<Reservation> findAll(Specification<Reservation> spec, Pageable pageable);

    Optional<Reservation> findById(int id);

    Reservation createReservation(AppUser appUser, List<Integer> bookIds, Date reservationDate, Date returnDate);

    void updateReservation(Reservation reservation);

    void deleteReservation(Reservation reservation);
    void checkDates(Date reservationDate, Date returnDate);
}
