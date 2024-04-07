package org.furstd.web_api.service.reservation;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.exceptions.BookNotAvailableException;
import org.furstd.web_api.exceptions.ForbiddenException;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.repository.IReservationRepository;
import org.furstd.web_api.service.book.IBookService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReservationService implements IReservationService {
    private final IReservationRepository reservationRepository;
    private final IBookService bookService;

    @Override
    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    @Override
    public Optional<Reservation> findById(int id) {
        return reservationRepository.findById(id);
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
}
