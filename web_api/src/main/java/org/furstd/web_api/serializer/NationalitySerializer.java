package org.furstd.web_api.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.furstd.web_api.model.author.Nationality;

import java.io.IOException;

public class NationalitySerializer extends StdSerializer<Nationality> {
    public NationalitySerializer() {
        super(Nationality.class);
    }

    @Override
    public void serialize(Nationality nationality, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeNumberField("id", nationality.getId());
        jsonGenerator.writeStringField("label", nationality.getLabel());
        jsonGenerator.writeEndObject();
    }
}
