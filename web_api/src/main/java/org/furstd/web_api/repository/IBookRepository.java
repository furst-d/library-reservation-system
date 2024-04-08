package org.furstd.web_api.repository;

import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.model.book.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBookRepository extends JpaRepository<Book, Integer>, JpaSpecificationExecutor<Book> {
    @Query("SELECT b FROM Book b WHERE b.id IN :ids")
    List<Book> findByIds(List<Integer> ids);

    @Query("SELECT b.genre " +
            "FROM Reservation r JOIN r.books b " +
            "WHERE r.appUser = :user " +
            "GROUP BY b.genre " +
            "ORDER BY COUNT(b.genre) DESC")
    List<Genre> findTopGenresForUser(@Param("user") AppUser user, Pageable pageable);


    @Query("SELECT b.author " +
            "FROM Reservation r JOIN r.books b " +
            "WHERE r.appUser = :user " +
            "GROUP BY b.author " +
            "ORDER BY COUNT(b.author) DESC")
    List<Author> findTopAuthorsForUser(@Param("user") AppUser user, Pageable pageable);

    @Query(value = "SELECT b.*, COUNT(rb.reservation_id) AS reservation_count " +
            "FROM book b " +
            "INNER JOIN reservation_book rb ON rb.book_id = b.id " +
            "WHERE b.genre IN :genres " +
            "AND b.available_quantity > 0 " +
            "AND b.id NOT IN ( " +
            "  SELECT rb2.book_id " +
            "  FROM reservation r2 " +
            "  INNER JOIN reservation_book rb2 ON r2.id = rb2.reservation_id " +
            "  WHERE r2.app_user_id = :userId " +
            ") " +
            "GROUP BY b.id " +
            "ORDER BY reservation_count DESC", nativeQuery = true)
    List<Book> findTopBooksForGenresNotReadByUser(@Param("genres") List<String> genres, @Param("userId") Long userId, Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.author IN :authors AND b.availableQuantity > 0 " +
            "AND b.id NOT IN (SELECT rb.id FROM Reservation r JOIN r.books rb WHERE r.appUser = :user) " +
            "GROUP BY b.id " +
            "ORDER BY COUNT(b.id) DESC")
    List<Book> findTopBooksForAuthorsNotReadByUser(@Param("authors") List<Author> authors, @Param("user") AppUser user, Pageable pageable);

    @Query(value = "SELECT b.* FROM book b " +
            "JOIN reservation_book rb ON b.id = rb.book_id " +
            "JOIN reservation r ON rb.reservation_id = r.id " +
            "WHERE b.available_quantity > 0 " +
            "GROUP BY b.id " +
            "ORDER BY COUNT(r.id) DESC",
            nativeQuery = true)
    List<Book> findTopReservedBooks(Pageable pageable);

    @Query("SELECT b FROM Book b WHERE LOWER(b.title) LIKE %:phrase% OR LOWER(b.author.firstName) LIKE %:phrase% OR LOWER(b.author.lastName) LIKE %:phrase%")
    Page<Book> search(String phrase, Pageable pageable);
}
