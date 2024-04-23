package org.furstd.web_api.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.furstd.web_api.model.book.Language;

import java.io.IOException;

public class LanguageSerializer extends StdSerializer<Language> {
    public LanguageSerializer() {
        super(Language.class);
    }

    @Override
    public void serialize(Language language, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", language.getId());
        jsonGenerator.writeStringField("label", language.getLabel());
        jsonGenerator.writeEndObject();
    }
}
