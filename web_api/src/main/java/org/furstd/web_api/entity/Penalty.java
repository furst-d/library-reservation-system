package org.furstd.web_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Penalty {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private Date creationDate;

    @Column(nullable = false)
    private Date paymentDate;

    @Column(nullable = false)
    private boolean paid;

    @OneToOne()
    @ToString.Exclude
    private Reservation reservation;
}
