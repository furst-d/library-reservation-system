package org.furstd.web_api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.furstd.web_api.entity.Book;

import java.util.List;

@Getter
@AllArgsConstructor
public class BookRecommendationsDTO {
    private List<Book> genreBasedRecommendations;
    private List<Book> authorBasedRecommendations;
    private List<Book> topBooks;
}
