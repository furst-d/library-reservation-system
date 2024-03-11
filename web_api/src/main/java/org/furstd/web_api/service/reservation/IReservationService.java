package org.furstd.web_api.service.reservation;

import org.furstd.web_api.entity.Reservation;

import java.util.List;
import java.util.Optional;

public interface IReservationService {

    List<Reservation> findAll();

    Optional<Reservation> findById(int id);

    void updateReservation(Reservation reservation);

    void deleteReservation(Reservation reservation);
}
