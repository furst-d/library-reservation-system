package org.furstd.web_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Penalty {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(nullable = false)
    private int amountCzk;

    @Column(nullable = false)
    private Date creationDate;

    @Column(nullable = false)
    private Date paymentDate;

    @Column(nullable = false)
    private boolean paid;

    public Penalty(int amountCzk, Date creationDate, Date paymentDate) {
        this.amountCzk = amountCzk;
        this.creationDate = creationDate;
        this.paymentDate = paymentDate;
        this.paid = false;
    }
}
