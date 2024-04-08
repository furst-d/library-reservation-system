package org.furstd.web_api.service.author;

import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.entity.Author;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface IAuthorService {

    ListResponseDTO<Author> findAll(Specification<Author> spec, Pageable pageable);

    Optional<Author> findById(int id);

    void updateAuthor(Author author);

    void deleteAuthor(Author author);
}
