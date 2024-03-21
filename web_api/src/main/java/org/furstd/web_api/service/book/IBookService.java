package org.furstd.web_api.service.book;

import org.furstd.web_api.entity.Book;

import java.util.List;
import java.util.Optional;

public interface IBookService {

    List<Book> findAll();

    Optional<Book> findById(int id);

    List<Book> findByIds(List<Integer> ids);

    void updateBook(Book book);

    void deleteBook(Book book);
}
