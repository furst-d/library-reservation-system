package org.furstd.web_api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.furstd.web_api.converter.GenreConverter;
import org.furstd.web_api.converter.LanguageConverter;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Book {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private String title;

    @ManyToOne()
    @JoinColumn(nullable = false)
    @ToString.Exclude
    private Author author;

    @Convert(converter = GenreConverter.class)
    private Genre genre;

    @Convert(converter = LanguageConverter.class)
    private Language language;

    @Column(nullable = false)
    private int pages;

    private int publicationYear;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int availableQuantity;

    @Column(nullable = false)
    private String coverImageLink;

    public Book(String title, Author author, Genre genre, Language language, int pages, int publicationYear, int quantity, String coverImageLink) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.language = language;
        this.pages = pages;
        this.publicationYear = publicationYear;
        this.quantity = quantity;
        this.availableQuantity = quantity;
        this.coverImageLink = coverImageLink;
    }

    public boolean isAvailable() {
        return availableQuantity > 0;
    }
}