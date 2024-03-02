package org.furstd.web_api.repository;

import org.furstd.web_api.entity.Author;
import org.furstd.web_api.model.author.Nationality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAuthorRepository extends JpaRepository<Author, Integer> {
    List<Author> findByNationality(Nationality nationality);
}
