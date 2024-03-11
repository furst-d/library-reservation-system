package org.furstd.web_api.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.furstd.web_api.model.book.Genre;

@Converter(autoApply = true)
public class GenreConverter implements AttributeConverter<Genre, Integer> {
    @Override
    public Integer convertToDatabaseColumn(Genre genre) {
        if (genre == null) {
            return null;
        }
        return genre.getId();
    }

    @Override
    public Genre convertToEntityAttribute(Integer id) {
        if (id == null) {
            return null;
        }
        return Genre.getById(id).orElse(null);
    }
}
