package org.furstd.web_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @ManyToOne()
    @JoinColumn(nullable = false)
    @ToString.Exclude
    private User user;

    @ManyToMany
    @JoinTable(
            name = "reservation_book",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private List<Book> books;

    @Column(nullable = false)
    private Date reservationDate;

    @Column(nullable = false)
    private Date returnDate;

    @OneToOne()
    @ToString.Exclude
    private Penalty penalty;
}
