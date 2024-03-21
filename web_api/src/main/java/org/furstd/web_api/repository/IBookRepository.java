package org.furstd.web_api.repository;

import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByAuthor(Author author);
    List<Book> findByGenre(Genre genre);
    List<Book> findByLanguage(Language language);

    @Query("SELECT b FROM Book b WHERE b.id IN :ids")
    List<Book> findByIds(List<Integer> ids);
}
