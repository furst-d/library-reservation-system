package org.furstd.web_api.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;

import java.io.IOException;

public class GenreSerializer extends StdSerializer<Genre> {
    public GenreSerializer() {
        super(Genre.class);
    }

    @Override
    public void serialize(Genre genre, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", genre.getId());
        jsonGenerator.writeStringField("label", genre.getLabel());
        jsonGenerator.writeEndObject();
    }
}
