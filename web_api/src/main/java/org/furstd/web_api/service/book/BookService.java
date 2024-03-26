package org.furstd.web_api.service.book;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.BookRecommendationsDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.repository.IBookRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BookService implements IBookService {
    private final IBookRepository bookRepository;

    public List<Book> findAll() {
        return bookRepository.findAll();
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
        bookRepository.delete(book);
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
        List<Object[]> results = bookRepository.findTopGenresForUser(user, pageable);

        return results.stream()
                .map(result -> (Genre) result[0])
                .toList();
    }

    private List<Author> findTopAuthorsForUser(AppUser user) {
        Pageable pageable = PageRequest.of(0, 3);
        List<Object[]> results = bookRepository.findTopAuthorsForUser(user, pageable);

        return results.stream()
                .map(result -> (Author) result[0])
                .toList();
    }

    private List<Book> findTopBooksForGenresNotReadByUser(List<Genre> genres, AppUser user) {
        Pageable pageable = PageRequest.of(0, 5);
        List<String> genreStrings = genres.stream().map(Enum::name).toList();
        Long userId = (long) user.getId();
        return bookRepository.findTopBooksForGenresNotReadByUser(genreStrings, userId, pageable);
    }

    private List<Book> findTopBooksForAuthorsNotReadByUser(List<Author> authors, AppUser user) {
        Pageable pageable = PageRequest.of(0, 5);
        return bookRepository.findTopBooksForAuthors(authors, user, pageable);
    }

    private List<Book> findTopGloballyReservedBooks() {
        Pageable pageable = PageRequest.of(0, 5);
        return bookRepository.findTopReservedBooks(pageable);
    }
}
