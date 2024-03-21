package org.furstd.web_api.controller;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.BookDTO;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.service.author.IAuthorService;
import org.furstd.web_api.service.book.IBookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("books")
@RestController
@RequiredArgsConstructor
public class BookController {
    private final IBookService bookService;
    private final IAuthorService authorService;

    private static final String NOT_FOUND_MESSAGE = "Book not found!";

    @RequestMapping("")
    public ResponseEntity<Object> getBooks() {
        return ResponseEntity.ok(bookService.findAll());
    }

    @RequestMapping("{id}")
    public ResponseEntity<Object> getBook(@PathVariable int id) {
        return ResponseEntity.ok(bookService.findById(id).orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE)));
    }

    @PostMapping("")
    public ResponseEntity<Object> createBook(@RequestBody BookDTO bookDTO) {
        Author author = authorService.findById(bookDTO.getAuthorId())
                .orElseThrow(() -> new NotFoundException("Author not found!"));
        Genre genre = Genre.getById(bookDTO.getGenreId())
                .orElseThrow(() -> new NotFoundException("Genre not found!"));
        Language language = Language.getById(bookDTO.getLanguageId())
                .orElseThrow(() -> new NotFoundException("Language not found!"));

        Book book = new Book(bookDTO.getTitle(), author, genre, language, bookDTO.getPages(), bookDTO.getPublicationYear(), bookDTO.getQuantity(), bookDTO.getCoverImageLink());
        bookService.updateBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(new Msg("Book was created successfully!"));
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> updateBook(@PathVariable int id, @RequestBody BookDTO bookDTO) {
        Book book = bookService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));

        Author author = authorService.findById(bookDTO.getAuthorId())
                .orElseThrow(() -> new NotFoundException("Author not found!"));
        Genre genre = Genre.getById(bookDTO.getGenreId())
                .orElseThrow(() -> new NotFoundException("Genre not found!"));
        Language language = Language.getById(bookDTO.getLanguageId())
                .orElseThrow(() -> new NotFoundException("Language not found!"));

        book.setTitle(bookDTO.getTitle());
        book.setAuthor(author);
        book.setGenre(genre);
        book.setLanguage(language);
        book.setPages(bookDTO.getPages());
        book.setPublicationYear(bookDTO.getPublicationYear());
        book.setQuantity(bookDTO.getQuantity());

        bookService.updateBook(book);
        return ResponseEntity.ok(new Msg("Book was updated successfully!"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable int id) {
        Book book = bookService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));

        bookService.deleteBook(book);
        return ResponseEntity.ok(new Msg("Book was deleted successfully!"));
    }
}
