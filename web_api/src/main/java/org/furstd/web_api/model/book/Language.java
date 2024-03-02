package org.furstd.web_api.model.book;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@Getter
public enum Language {
    ENGLISH(1, "Angličtina"),
    CZECH(2, "Čeština"),
    GERMAN(3, "Němčina"),
    FRENCH(4, "Francouzština"),
    SPANISH(5, "Španělština"),
    ITALIAN(6, "Italština"),
    PORTUGUESE(7, "Portugalština"),
    SLOVAK(8, "Slovenština");

    private final int id;
    private final String label;

    private static final Map<Integer, Language> BY_ID = new HashMap<>();

    static {
        for (Language language : values()) {
            BY_ID.put(language.id, language);
        }
    }

    public static Language getById(int id) {
        return BY_ID.get(id);
    }
}
