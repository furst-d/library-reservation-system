package org.furstd.web_api.service.book;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.BookRecommendationsDTO;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Reservation;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.repository.IBookRepository;
import org.furstd.web_api.repository.IReservationRepository;
import org.furstd.web_api.service.IFilterService;
import org.furstd.web_api.specification.BookSpecification;
import org.furstd.web_api.util.FilterCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BookService implements IBookService, IFilterService<Book> {
    private final IBookRepository bookRepository;
    private final IReservationRepository reservationRepository;

    public ListResponseDTO<Book> findAll(Specification<Book> spec, Pageable pageable) {
        Page<Book> books = bookRepository.findAll(spec, pageable);
        return new ListResponseDTO<>(books.getTotalElements(), books.getContent());
    }

    @Override
    public Optional<Book> findById(int id) {
        return bookRepository.findById(id);
    }

    @Override
    public List<Book> findByIds(List<Integer> ids) {
        return bookRepository.findByIds(ids);
    }

    @Override
    public void updateBook(Book book) {
        bookRepository.save(book);
    }

    @Override
    public void deleteBook(Book book) {
        List<Reservation> reservations = reservationRepository.findAllByBooksContaining(book);

        for (Reservation reservation : reservations) {
            reservation.getBooks().remove(book);
            reservationRepository.save(reservation);
        }

        bookRepository.delete(book);
    }

    @Override
    public ListResponseDTO<Book> searchBooks(String phrase, Pageable pageable) {
        Page<Book> books = bookRepository.search(phrase, pageable);
        return new ListResponseDTO<>(books.getTotalElements(), books.getContent());
    }

    @Override
    public void updateBooks(List<Book> books) {
        bookRepository.saveAll(books);
    }

    @Override
    public Specification<Book> applyFilter(Specification<Book> spec, FilterCriteria criteria) {
        if (!criteria.getValue().isEmpty()) {
            String value = criteria.getValue();
            return switch (criteria.getName()) {
                case "title" -> spec.and(BookSpecification.hasTitle(value));
                case "author" -> spec.and(BookSpecification.hasAuthor(value));
                case "authorId" -> spec.and(BookSpecification.hasAuthorId(Integer.parseInt(value)));
                case "bookIds" -> spec.and(BookSpecification.hasBookIds(value));
                case "genre" -> spec.and(BookSpecification.hasGenre(Integer.parseInt(value)));
                case "language" -> spec.and(BookSpecification.hasLanguage(Integer.parseInt(value)));
                case "inStock" -> {
                    if (Boolean.parseBoolean(value)) {
                        yield spec.and(BookSpecification.isInStock());
                    }
                    yield spec;
                }
                default -> spec;
            };
        }
        return spec;
    }

    @Override
    public BookRecommendationsDTO generateRecommendations(AppUser user) {
        List<Genre> topGenres = findTopGenresForUser(user);
        List<Author> topAuthors = findTopAuthorsForUser(user);

        List<Book> genreBasedRecommendations = findTopBooksForGenresNotReadByUser(topGenres, user);
        List<Book> authorBasedRecommendations = findTopBooksForAuthorsNotReadByUser(topAuthors, user);
        List<Book> topBooks = findTopGloballyReservedBooks();

        return new BookRecommendationsDTO(
                genreBasedRecommendations,
                authorBasedRecommendations,
                topBooks
        );
    }

    private List<Genre> findTopGenresForUser(AppUser user) {
        Pageable pageable = PageRequest.of(0, 3);
        return bookRepository.findTopGenresForUser(user, pageable);
    }

    private List<Author> findTopAuthorsForUser(AppUser user) {
        Pageable pageable = PageRequest.of(0, 3);
        return bookRepository.findTopAuthorsForUser(user, pageable);
    }

    private List<Book> findTopBooksForGenresNotReadByUser(List<Genre> genres, AppUser user) {
        Pageable pageable = PageRequest.of(0, 5);
        List<Integer> genreIds = genres.stream().map(Genre::getId).toList();
        Long userId = (long) user.getId();
        return bookRepository.findTopBooksForGenresNotReadByUser(genreIds, userId, pageable);
    }

    private List<Book> findTopBooksForAuthorsNotReadByUser(List<Author> authors, AppUser user) {
        Pageable pageable = PageRequest.of(0, 5);
        return bookRepository.findTopBooksForAuthorsNotReadByUser(authors, user, pageable);
    }

    private List<Book> findTopGloballyReservedBooks() {
        Pageable pageable = PageRequest.of(0, 5);
        return bookRepository.findTopReservedBooks(pageable);
    }
}
