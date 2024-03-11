package org.furstd.web_api.service.reservation;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.repository.IReservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService implements IReservationService {
    private final IReservationRepository reservationRepository;

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    public Optional<Reservation> findById(int id) {
        return reservationRepository.findById(id);
    }

    @Override
    public void updateReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservation(Reservation reservation) {
        reservationRepository.delete(reservation);
    }
}
