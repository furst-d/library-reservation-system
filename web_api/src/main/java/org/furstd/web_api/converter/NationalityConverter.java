package org.furstd.web_api.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.furstd.web_api.model.author.Nationality;

@Converter(autoApply = true)
public class NationalityConverter implements AttributeConverter<Nationality, Integer> {
    @Override
    public Integer convertToDatabaseColumn(Nationality nationality) {
        if (nationality == null) {
            return null;
        }
        return nationality.getId();
    }

    @Override
    public Nationality convertToEntityAttribute(Integer id) {
        if (id == null) {
            return null;
        }
        return Nationality.getById(id);
    }
}
