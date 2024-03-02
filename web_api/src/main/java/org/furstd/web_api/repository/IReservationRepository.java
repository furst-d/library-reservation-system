package org.furstd.web_api.repository;

import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByAppUser(AppUser appUser);
}
