package org.furstd.web_api.service.author;

import org.furstd.web_api.entity.Author;

import java.util.List;
import java.util.Optional;

public interface IAuthorService {

    List<Author> findAll();

    Optional<Author> findById(int id);

    void updateAuthor(Author author);

    void deleteAuthor(Author author);
}
