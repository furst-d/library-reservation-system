package org.furstd.web_api.service.book;

import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.model.author.Nationality;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;
import org.furstd.web_api.repository.IAuthorRepository;
import org.furstd.web_api.repository.IBookRepository;
import org.furstd.web_api.service.author.AuthorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.util.Date;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertFalse;

@DataJpaTest
@Import({AuthorService.class, BookService.class})
@ActiveProfiles("test")
public class AuthorBookIntegrationTest {
    @Autowired
    private AuthorService authorService;

    @Autowired
    private BookService bookService;

    @Autowired
    private IAuthorRepository authorRepository;

    @Autowired
    private IBookRepository bookRepository;

    @Test
    void whenDeleteAuthorThenAllAssociatedBooksAreDeleted() {
        Author author = new Author("John", "Doe", new Date(), Nationality.AMERICAN);
        authorRepository.save(author);

        Book bookOne = new Book("Book One", author, Genre.FANTASY, Language.ENGLISH, 300, 2020, 5, "http://image.link/bookone.jpg");
        Book bookTwo = new Book("Book Two", author, Genre.SCIENCE, Language.FRENCH, 250, 2018, 3, "http://image.link/booktwo.jpg");

        bookRepository.save(bookOne);
        bookRepository.save(bookTwo);

        author.getBooks().add(bookOne);
        author.getBooks().add(bookTwo);

        // Check if books were saved
        assertNotNull(bookRepository.findById(bookOne.getId()));
        assertNotNull(bookRepository.findById(bookTwo.getId()));

        authorService.deleteAuthor(author);

        // Check if books were deleted
        assertFalse(bookRepository.findById(bookOne.getId()).isPresent());
        assertFalse(bookRepository.findById(bookTwo.getId()).isPresent());
    }
}
