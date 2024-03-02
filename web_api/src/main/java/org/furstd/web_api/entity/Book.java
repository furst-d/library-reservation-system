package org.furstd.web_api.entity;

import jakarta.persistence.*;
import lombok.*;
import org.furstd.web_api.converter.GenreConverter;
import org.furstd.web_api.converter.LanguageConverter;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;

@Entity
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToOne()
    @JoinColumn(nullable = false)
    @ToString.Exclude
    private BookQuantity quantity;
}
