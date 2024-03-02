package org.furstd.web_api.converter;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.furstd.web_api.model.book.Language;

@Converter(autoApply = true)
public class LanguageConverter implements AttributeConverter<Language, Integer> {
    @Override
    public Integer convertToDatabaseColumn(Language language) {
        if (language == null) {
            return null;
        }
        return language.getId();
    }

    @Override
    public Language convertToEntityAttribute(Integer id) {
        if (id == null) {
            return null;
        }
        return Language.getById(id);
    }
}
