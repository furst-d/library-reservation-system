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

    @PutMapping("{id}")
    public ResponseEntity<Object> updateBook(@PathVariable int id, @RequestBody BookDTO bookDTO) {
        Book book = bookService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));

        if (bookDTO.getTitle() != null) {
            book.setTitle(bookDTO.getTitle());
        }

        if (bookDTO.getAuthorId() != 0) {
            Author author = authorService.findById(bookDTO.getAuthorId())
                    .orElseThrow(() -> new NotFoundException("Author not found!"));
            book.setAuthor(author);
        }

        if (bookDTO.getGenreId() != 0) {
            Genre genre = Genre.getById(bookDTO.getGenreId())
                    .orElseThrow(() -> new NotFoundException("Genre not found!"));
            book.setGenre(genre);
        }

        if (bookDTO.getLanguageId() != 0) {
            Language language = Language.getById(bookDTO.getLanguageId())
                    .orElseThrow(() -> new NotFoundException("Language not found!"));
            book.setLanguage(language);
        }

        if (bookDTO.getPages() != 0) {
            book.setPages(bookDTO.getPages());
        }

        if (bookDTO.getPublicationYear() != 0) {
            book.setPublicationYear(bookDTO.getPublicationYear());
        }

        if (bookDTO.getQuantity() != 0) {
            book.setQuantity(bookDTO.getQuantity());
        }

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
