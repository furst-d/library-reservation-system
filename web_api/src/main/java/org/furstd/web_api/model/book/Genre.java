package org.furstd.web_api.model.book;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Getter
public enum Genre {
    FANTASY(1, "Fantasy"),
    SCIENCE_FICTION(2, "Sci-Fi"),
    HORROR(3, "Horror"),
    THRILLER(5, "Thriller"),
    ROMANCE(6, "Román"),
    WESTERN(7, "Western"),
    MEMOIR(8, "Paměti"),
    BIOGRAPHY(9, "Biografie"),
    HEALTH(10, "Zdraví"),
    GUIDE(11, "Průvodce"),
    TRAVEL(12, "Cestování"),
    CHILDREN(13, "Dětská"),
    RELIGION(14, "Náboženství"),
    SPIRITUALITY(15, "Spiritualita"),
    SCIENCE(16, "Věda"),
    HISTORY(17, "Historie"),
    MATH(18, "Matematika"),
    POETRY(19, "Poezie"),
    ENCYCLOPEDIAS(20, "Encyklopedie"),
    DICTIONARIES(21, "Slovníky"),
    COMICS(22, "Komiksy"),
    ART(23, "Umění"),
    COOKBOOKS(24, "Kuchařky"),
    DIARIES(25, "Deníky"),
    JOURNALS(26, "Časopisy"),
    PRAYER_BOOKS(27, "Modlitební knihy"),
    BIOGRAPHIES(28, "Biografie"),
    AUTOBIOGRAPHIES(29, "Autobiografie"),
    FAIRYTALE(30, "Pohádka"),
    DETECTIVE_NOVEL(31, "Detektivní román"),
    DRAMA(32, "Drama"),
    SATIRE(33, "Satira");

    private final int id;
    private final String label;

    private static final Map<Integer, Genre> BY_ID = new HashMap<>();

    static {
        for (Genre genre : values()) {
            BY_ID.put(genre.id, genre);
        }
    }

    public static Optional<Genre> getById(int id) {
        return Optional.ofNullable(BY_ID.get(id));
    }
}
