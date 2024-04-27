package org.furstd.web_api.repository;

import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.entity.AppUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Integer>, JpaSpecificationExecutor<Reservation> {
    Page<Reservation> findByAppUser(AppUser appUser, Pageable pageable);

    @Query("SELECT r FROM Reservation r JOIN r.books b WHERE b = :book")
    List<Reservation> findAllByBooksContaining(Book book);
}
