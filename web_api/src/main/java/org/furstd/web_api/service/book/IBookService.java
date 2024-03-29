package org.furstd.web_api.service.book;

import org.furstd.web_api.dto.BookRecommendationsDTO;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.util.FilterCriteria;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface IBookService {

    ListResponseDTO<Book> findAll(Specification<Book> spec, Pageable pageable);

    Optional<Book> findById(int id);

    List<Book> findByIds(List<Integer> ids);

    void updateBook(Book book);

    void deleteBook(Book book);

    BookRecommendationsDTO generateRecommendations(AppUser user);

    Specification<Book> applyFilter(Specification<Book> spec, FilterCriteria criteria);
}
