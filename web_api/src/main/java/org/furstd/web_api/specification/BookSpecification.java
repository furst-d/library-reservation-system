package org.furstd.web_api.specification;

import org.furstd.web_api.entity.Book;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;
import org.springframework.data.jpa.domain.Specification;

import java.util.Arrays;
import java.util.List;

public class BookSpecification {

    private BookSpecification() {}

    public static Specification<Book> hasTitle(String title) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Book> hasAuthor(String author) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("author").get("lastName")), "%" + author + "%");
    }

    public static Specification<Book> hasAuthorId(int id) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("author").get("id"), id);
    }

    public static Specification<Book> isInStock() {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.greaterThan(root.get("availableQuantity"), 0);
    }

    public static Specification<Book> hasGenre(int genreId) {
        return (root, query, criteriaBuilder) -> {
            Genre genre = Genre.getById(genreId).orElse(null);
            if (genre == null) {
                return criteriaBuilder.disjunction();
            }
            return criteriaBuilder.equal(root.get("genre"), genre);
        };
    }

    public static Specification<Book> hasLanguage(int languageId) {
        return (root, query, criteriaBuilder) -> {
            Language language = Language.getById(languageId).orElse(null);
            if (language == null) {
                return criteriaBuilder.disjunction();
            }
            return criteriaBuilder.equal(root.get("language"), language);
        };
    }

    public static Specification<Book> hasBookIds(String value) {
        value = value.substring(1, value.length() - 1);

        List<Integer> ids = Arrays.stream(value.split(","))
                .map(String::trim)
                .map(Integer::valueOf)
                .toList();

        return (root, query, criteriaBuilder) -> root.get("id").in(ids);
    }
}