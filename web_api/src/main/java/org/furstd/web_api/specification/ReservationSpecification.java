package org.furstd.web_api.specification;

import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Reservation;
import org.springframework.data.jpa.domain.Specification;

public class ReservationSpecification {

    private ReservationSpecification() {}

    public static Specification<Reservation> hasEmail(String lastName) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("appUser").get("email")), "%" + lastName + "%");
    }

    public static Specification<Reservation> hasLastName(String lastName) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("appUser").get("lastName")), "%" + lastName + "%");
    }

    public static Specification<Reservation> isExpired() {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.lessThan(root.get("returnDate"), java.util.Calendar.getInstance().getTime());
    }
}