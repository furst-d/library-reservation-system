package org.furstd.web_api.service.author;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.repository.IAuthorRepository;
import org.furstd.web_api.service.IFilterService;
import org.furstd.web_api.service.book.BookService;
import org.furstd.web_api.specification.AuthorSpecification;
import org.furstd.web_api.specification.BookSpecification;
import org.furstd.web_api.util.FilterCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorService implements IAuthorService, IFilterService<Author> {
    private final IAuthorRepository authorRepository;
    private final BookService bookService;

    public ListResponseDTO<Author> findAll(Specification<Author> spec, Pageable pageable) {
        Page<Author> authors = authorRepository.findAll(spec, pageable);
        return new ListResponseDTO<>(authors.getTotalElements(), authors.getContent());
    }

    @Override
    public Optional<Author> findById(int id) {
        return authorRepository.findById(id);
    }

    @Override
    public void updateAuthor(Author author) {
        authorRepository.save(author);
    }

    @Override
    public void deleteAuthor(Author author) {
        for (Book book : author.getBooks()) {
            bookService.deleteBook(book);
        }

        authorRepository.delete(author);
    }

    @Override
    public Specification<Author> applyFilter(Specification<Author> spec, FilterCriteria criteria) {
        if (!criteria.getValue().isEmpty()) {
            String value = criteria.getValue();
            return switch (criteria.getName()) {
                case "lastName" -> spec.and(AuthorSpecification.hasLastName(value));
                default -> spec;
            };
        }
        return spec;
    }
}
