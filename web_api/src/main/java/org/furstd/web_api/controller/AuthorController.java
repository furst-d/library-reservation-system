package org.furstd.web_api.controller;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.AuthorDTO;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.model.author.Nationality;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.service.author.IAuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("authors")
@RestController
@RequiredArgsConstructor
public class AuthorController {
    private final IAuthorService authorService;

    private static final String NOT_FOUND_MESSAGE = "Author not found!";

    @RequestMapping("")
    public ResponseEntity<Object> getAuthors() {
        return ResponseEntity.ok(authorService.findAll());
    }

    @RequestMapping("{id}")
    public ResponseEntity<Object> getAuthor(@PathVariable int id) {
        return ResponseEntity.ok(authorService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE)));
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> updateAuthor(@PathVariable int id, @RequestBody AuthorDTO authorDTO) {
        Author author = authorService.findById(id)
                .orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));

        if (authorDTO.getFirstName() != null) {
            author.setFirstName(authorDTO.getFirstName());
        }

        if (authorDTO.getLastName() != null) {
            author.setFirstName(authorDTO.getLastName());
        }

        if (authorDTO.getNationalityId() != 0) {
            Nationality nationality = Nationality.getById(authorDTO.getNationalityId())
                    .orElseThrow(() -> new NotFoundException("Genre not found!"));
            author.setNationality(nationality);
        }

        if (authorDTO.getBirthDate() != null) {
            author.setBirthDate(authorDTO.getBirthDate());
        }

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
