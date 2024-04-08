package org.furstd.web_api.specification;

import org.furstd.web_api.entity.Author;
import org.springframework.data.jpa.domain.Specification;

public class AuthorSpecification {

    private AuthorSpecification() {}

    public static Specification<Author> hasLastName(String lastName) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), "%" + lastName + "%");
    }
}