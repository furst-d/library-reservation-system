package org.furstd.web_api.repository;

import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByUser(User user);
}
