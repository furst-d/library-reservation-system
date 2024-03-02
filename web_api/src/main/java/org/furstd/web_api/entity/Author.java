package org.furstd.web_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.furstd.web_api.converter.NationalityConverter;
import org.furstd.web_api.model.author.Nationality;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Author {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private Date birthDate;

    @Convert(converter = NationalityConverter.class)
    private Nationality nationality;

    @OneToMany(mappedBy = "author")
    private final List<Book> books = Collections.emptyList();
}
