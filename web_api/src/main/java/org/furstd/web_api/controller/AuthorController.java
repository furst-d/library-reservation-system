package org.furstd.web_api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.AuthorDTO;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.model.author.Nationality;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.service.author.AuthorService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("authors")
@RestController
@RequiredArgsConstructor
public class AuthorController extends BaseController<Author> {
    private final AuthorService authorService;

    private static final String NOT_FOUND_MESSAGE = "Author not found!";

    @RequestMapping("")
    public ResponseEntity<Object> getAuthors(@RequestParam(required = false) String filters,
                                           @PageableDefault(sort = "lastName", direction = Sort.Direction.ASC) Pageable pageable) throws JsonProcessingException {

        Specification<Author> spec = this.processFilters(filters, authorService);
        ListResponseDTO<Author> authorListDTO = authorService.findAll(spec, pageable);
        return ResponseEntity.ok(authorListDTO);
    }

    @RequestMapping("{id}")
    public ResponseEntity<Object> getAuthor(@PathVariable int id) {
        return ResponseEntity.ok(authorService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE)));
    }

    @PostMapping("")
    public ResponseEntity<Object> createAuthor(@RequestBody AuthorDTO authorDTO) {
        Nationality nationality = Nationality.getById(authorDTO.getNationalityId())
                .orElseThrow(() -> new NotFoundException("Nationality not found!"));

        Author author = new Author(authorDTO.getFirstName(), authorDTO.getLastName(), authorDTO.getBirthDate(), nationality);
        authorService.updateAuthor(author);
        return ResponseEntity.status(HttpStatus.CREATED).body(new Msg("Author was created successfully!"));
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> updateAuthor(@PathVariable int id, @RequestBody AuthorDTO authorDTO) {
        Author author = authorService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));
        Nationality nationality = Nationality.getById(authorDTO.getNationalityId())
                .orElseThrow(() -> new NotFoundException("Nationality not found!"));

        author.setFirstName(authorDTO.getFirstName());
        author.setLastName(authorDTO.getLastName());
        author.setNationality(nationality);
        author.setBirthDate(authorDTO.getBirthDate());

        authorService.updateAuthor(author);
        return ResponseEntity.ok(new Msg("Author was updated successfully!"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Object> deleteAuthor(@PathVariable int id) {
        Author author = authorService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));

        authorService.deleteAuthor(author);
        return ResponseEntity.ok(new Msg("Author was deleted successfully!"));
    }
}
