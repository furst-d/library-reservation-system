package org.furstd.web_api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.BookDTO;
import org.furstd.web_api.dto.EnumValueDTO;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.service.author.IAuthorService;
import org.furstd.web_api.service.book.BookService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RequestMapping("books")
@RestController
@RequiredArgsConstructor
public class BookController extends BaseController<Book>{
    private final BookService bookService;
    private final IAuthorService authorService;

    private static final String NOT_FOUND_MESSAGE = "Book not found!";

    @RequestMapping("")
    public ResponseEntity<Object> getBooks(@RequestParam(required = false) String filters,
                                           @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) throws JsonProcessingException {

        Specification<Book> spec = this.processFilters(filters, bookService);
        ListResponseDTO<Book> bookListDTO = bookService.findAll(spec, pageable);
        return ResponseEntity.ok(bookListDTO);
    }

    @RequestMapping("search")
    public ResponseEntity<Object> searchBooks(@RequestParam String phrase,
                                           @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) throws JsonProcessingException {

        ListResponseDTO<Book> bookListDTO = bookService.searchBooks(phrase.toLowerCase(), pageable);
        return ResponseEntity.ok(bookListDTO);
    }

    @RequestMapping("{id}")
    public ResponseEntity<Object> getBook(@PathVariable int id) {
        return ResponseEntity.ok(bookService.findById(id).orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE)));
    }

    @RequestMapping("genres")
    public ResponseEntity<Object> getGenres() {
        List<EnumValueDTO> genres = Arrays.stream(Genre.values())
                .map(genre -> new EnumValueDTO(genre.getId(), genre.getLabel()))
                .toList();
        return ResponseEntity.ok(genres);
    }

    @RequestMapping("languages")
    public ResponseEntity<Object> getLanguages() {
        List<EnumValueDTO> languages = Arrays.stream(Language.values())
                .map(language -> new EnumValueDTO(language.getId(), language.getLabel()))
                .toList();
        return ResponseEntity.ok(languages);
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
