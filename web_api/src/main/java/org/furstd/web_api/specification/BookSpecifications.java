package org.furstd.web_api.specification;

import org.furstd.web_api.entity.Book;
import org.springframework.data.jpa.domain.Specification;

public class BookSpecifications {

    private BookSpecifications() {}

    public static Specification<Book> hasTitle(String title) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%");
    }

    public static Specification<Book> hasAuthor(String author) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("author").get("lastName")), "%" + author + "%");
    }

    public static Specification<Book> isInStock() {
        System.out.println("Aplikuji");
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.greaterThan(root.get("availableQuantity"), 0);
    }
}