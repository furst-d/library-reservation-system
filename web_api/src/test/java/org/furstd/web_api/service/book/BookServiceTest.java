package org.furstd.web_api.service.book;

import org.furstd.web_api.dto.BookRecommendationsDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.repository.IBookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Pageable;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class BookServiceTest {
    @InjectMocks
    private BookService bookService;

    @Mock
    private IBookRepository bookRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void generateRecommendationsTest() {
        AppUser user = new AppUser();
        List<Genre> topGenres = Arrays.asList(Genre.FANTASY, Genre.SCIENCE_FICTION);
        List<Author> topAuthors = Arrays.asList(new Author(), new Author());
        List<Book> genreBasedRecommendations = Arrays.asList(new Book(), new Book());
        List<Book> authorBasedRecommendations = Arrays.asList(new Book(), new Book());
        List<Book> topBooks = Arrays.asList(new Book(), new Book());

        when(bookRepository.findTopGenresForUser(any(AppUser.class), any(Pageable.class)))
                .thenReturn(topGenres);
        when(bookRepository.findTopAuthorsForUser(any(AppUser.class), any(Pageable.class)))
                .thenReturn(topAuthors);
        when(bookRepository.findTopBooksForGenresNotReadByUser(anyList(), anyLong(), any(Pageable.class))).thenReturn(genreBasedRecommendations);
        when(bookRepository.findTopBooksForAuthorsNotReadByUser(anyList(), any(AppUser.class), any(Pageable.class))).thenReturn(authorBasedRecommendations);
        when(bookRepository.findTopReservedBooks(any(Pageable.class))).thenReturn(topBooks);

        BookRecommendationsDTO recommendations = bookService.generateRecommendations(user);

        assertEquals(2, recommendations.getGenreBasedRecommendations().size());
        assertEquals(2, recommendations.getAuthorBasedRecommendations().size());
        assertEquals(2, recommendations.getTopBooks().size());
    }


    @Test
    void generateRecommendationsWithNoReservationsTest() {
        AppUser user = new AppUser();
        when(bookRepository.findTopGenresForUser(any(AppUser.class), any(Pageable.class)))
                .thenReturn(Collections.emptyList());
        when(bookRepository.findTopAuthorsForUser(any(AppUser.class), any(Pageable.class)))
                .thenReturn(Collections.emptyList());
        when(bookRepository.findTopBooksForGenresNotReadByUser(anyList(), anyLong(), any(Pageable.class))).thenReturn(Collections.emptyList());
        when(bookRepository.findTopBooksForAuthorsNotReadByUser(anyList(), any(AppUser.class), any(Pageable.class))).thenReturn(Collections.emptyList());
        when(bookRepository.findTopReservedBooks(any(Pageable.class))).thenReturn(Collections.emptyList());

        BookRecommendationsDTO recommendations = bookService.generateRecommendations(user);

        assertTrue(recommendations.getGenreBasedRecommendations().isEmpty());
        assertTrue(recommendations.getAuthorBasedRecommendations().isEmpty());
        assertTrue(recommendations.getTopBooks().isEmpty());
    }

    @Test
    void generateRecommendationsWithOneDominantAuthorTest() {
        AppUser user = new AppUser();
        Author dominantAuthor = new Author();
        dominantAuthor.setFirstName("Dominant");
        dominantAuthor.setLastName("Author");
        List<Author> topAuthors = Arrays.asList(dominantAuthor);
        Book book1 = new Book();
        book1.setAuthor(dominantAuthor);
        Book book2 = new Book();
        book2.setAuthor(dominantAuthor);
        List<Book> authorBasedRecommendations = Arrays.asList(book1, book2);

        when(bookRepository.findTopAuthorsForUser(any(AppUser.class), any(Pageable.class)))
                .thenReturn(topAuthors);
        when(bookRepository.findTopBooksForAuthorsNotReadByUser(anyList(), any(AppUser.class), any(Pageable.class)))
                .thenReturn(authorBasedRecommendations);

        when(bookRepository.findTopGenresForUser(any(AppUser.class), any(Pageable.class)))
                .thenReturn(Collections.emptyList());
        when(bookRepository.findTopReservedBooks(any(Pageable.class)))
                .thenReturn(Collections.emptyList());

        BookRecommendationsDTO recommendations = bookService.generateRecommendations(user);

        assertEquals(2, recommendations.getAuthorBasedRecommendations().size());
        assertTrue(recommendations.getAuthorBasedRecommendations().containsAll(authorBasedRecommendations));

        assertTrue(recommendations.getGenreBasedRecommendations().isEmpty());
        assertTrue(recommendations.getTopBooks().isEmpty());
    }
}