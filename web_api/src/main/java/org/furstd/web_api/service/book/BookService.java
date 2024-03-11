package org.furstd.web_api.service.book;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.repository.IBookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookService implements IBookService {
    private final IBookRepository bookRepository;

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> findById(int id) {
        return bookRepository.findById(id);
    }

    @Override
    public void updateBook(Book book) {
        bookRepository.save(book);
    }

    @Override
    public void deleteBook(Book book) {
        bookRepository.delete(book);
    }
}
