package org.furstd.web_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Reservation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @ManyToOne()
    @JoinColumn(nullable = false)
    @ToString.Exclude
    private AppUser appUser;

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

    @Column
    private Date returnedAt;

    @OneToOne(cascade = CascadeType.ALL)
    @ToString.Exclude
    private Penalty penalty;

    public Reservation(AppUser appUser, List<Book> books, Date reservationDate, Date returnDate) {
        this.appUser = appUser;
        this.books = books;
        this.reservationDate = reservationDate;
        this.returnDate = returnDate;
        this.returnedAt = null;
        this.penalty = null;
    }
}
