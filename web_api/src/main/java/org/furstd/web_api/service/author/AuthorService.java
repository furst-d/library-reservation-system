package org.furstd.web_api.service.author;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.repository.IAuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorService implements IAuthorService {
    private final IAuthorRepository authorRepository;

    public List<Author> findAll() {
        return authorRepository.findAll();
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
        authorRepository.delete(author);
    }
}
