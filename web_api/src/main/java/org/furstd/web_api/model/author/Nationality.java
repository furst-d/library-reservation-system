package org.furstd.web_api.model.author;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Getter
public enum Nationality {
    CZECH(1, "Česká"),
    SLOVAK(2, "Slovenská"),
    POLISH(3,"Polská"),
    GERMAN(4,"Německá"),
    FRENCH(5,"Francouzská"),
    SPANISH(6,"Španělská"),
    PORTUGUESE(7,"Portugalská"),
    SWISS(8,"Švýcarská"),
    AUSTRIAN(9,"Rakouská"),
    DUTCH(10,"Holandská"),
    BELGIAN(11,"Belgická"),
    LUXEMBOURG(12,"Lucemburská"),
    DANISH(13,"Dánská"),
    SWEDISH(14,"Švédská"),
    NORWEGIAN(15,"Norská"),
    FINNISH(16,"Finská"),
    ESTONIAN(17,"Estonská"),
    LATVIAN(18,"Lotyšská"),
    LITHUANIAN(19, "Litevská"),
    HUNGARIAN(20,"Maďarská"),
    ROMANIAN(21,"Rumunská"),
    BULGARIAN(22,"Bulharská"),
    GREEK(23,"Řecká"),
    CROATIAN(24,"Chorvatská"),
    SERBIAN(25,"Srbská"),
    SLOVENIAN(26,"Slovinská"),
    RUSSIAN(27,"Ruská"),
    BRITISH(28,"Britská"),
    AMERICAN(29,"Americká");

    private final int id;
    private final String label;
    private static final Map<Integer, Nationality> BY_ID = new HashMap<>();

    static {
        for (Nationality nationality : values()) {
            BY_ID.put(nationality.id, nationality);
        }
    }

    public static Nationality getById(int id) {
        return BY_ID.get(id);
    }
}
