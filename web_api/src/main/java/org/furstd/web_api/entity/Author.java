package org.furstd.web_api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.furstd.web_api.converter.NationalityConverter;
import org.furstd.web_api.model.author.Nationality;
import org.furstd.web_api.serializer.LanguageSerializer;
import org.furstd.web_api.serializer.NationalitySerializer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
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
    @JsonSerialize(using = NationalitySerializer.class)
    private Nationality nationality;

    @JsonIgnore
    @OneToMany(mappedBy = "author")
    private List<Book> books = new ArrayList<>();

    public Author(String firstName, String lastName, Date birthDate, Nationality nationality) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.nationality = nationality;
    }
}