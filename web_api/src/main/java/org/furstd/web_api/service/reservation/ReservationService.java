package org.furstd.web_api.service.reservation;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.exceptions.BookNotAvailableException;
import org.furstd.web_api.exceptions.ForbiddenException;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.repository.IReservationRepository;
import org.furstd.web_api.service.IFilterService;
import org.furstd.web_api.service.book.IBookService;
import org.furstd.web_api.specification.ReservationSpecification;
import org.furstd.web_api.util.FilterCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService implements IReservationService, IFilterService<Reservation> {
    private final IReservationRepository reservationRepository;
    private final IBookService bookService;

    @Override
    public ListResponseDTO<Reservation> findAll(Specification<Reservation> spec, Pageable pageable) {
        Page<Reservation> reservations = reservationRepository.findAll(spec, pageable);
        return new ListResponseDTO<>(reservations.getTotalElements(), reservations.getContent());
    }

    @Override
    public Optional<Reservation> findById(int id) {
        return reservationRepository.findById(id);
    }

    @Override
    public ListResponseDTO<Reservation> findByUser(AppUser user, Pageable pageable) {
        Page<Reservation> reservations = reservationRepository.findByAppUser(user, pageable);
        return new ListResponseDTO<>(reservations.getTotalElements(), reservations.getContent());
    }

    @Override
    public Reservation createReservation(AppUser appUser, List<Integer> bookIds, Date reservationDate, Date returnDate) {
        List<Book> books = bookService.findByIds(bookIds);
        if (books.isEmpty()) {
            throw new NotFoundException("Books not found!");
        }
        for (Book book : books) {
            if (!book.isAvailable()) {
                throw new BookNotAvailableException(book, "Book " + book.getTitle() + " is not available!");
            }
        }

        checkDates(reservationDate, returnDate);

        Reservation reservation = new Reservation(appUser, books, reservationDate, returnDate);

        for(Book book : books) {
            book.setAvailableQuantity(book.getAvailableQuantity() - 1);
        }
        bookService.updateBooks(books);

        updateReservation(reservation);
        return reservation;
    }

    @Override
    public void updateReservation(Reservation reservation) {
        reservationRepository.save(reservation);
    }

    @Override
    public void deleteReservation(Reservation reservation) {
        reservationRepository.delete(reservation);
    }

    public void checkDates(Date reservationDate, Date returnDate) {
        Date now = new Date();
        if (returnDate.before(now)) {
            throw new ForbiddenException("Return dates must be in the future!");
        } else if (returnDate.before(reservationDate)) {
            throw new ForbiddenException("Return date must be after reservation date!");
        }
    }

    @Override
    public Specification<Reservation> applyFilter(Specification<Reservation> spec, FilterCriteria criteria) {
        if (!criteria.getValue().isEmpty()) {
            String value = criteria.getValue();
            return switch (criteria.getName()) {
                case "email" -> spec.and(ReservationSpecification.hasEmail(value));
                case "lastName" -> spec.and(ReservationSpecification.hasLastName(value));
                case "expired" -> {
                    if (Boolean.parseBoolean(value)) {
                        yield spec.and(ReservationSpecification.isExpired());
                    }
                    yield spec;
                }
                default -> spec;
            };
        }
        return spec;
    }
}
