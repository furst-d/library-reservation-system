package org.furstd.web_api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookQuantity {
    @Id
    @OneToOne()
    @JoinColumn(nullable = false)
    @ToString.Exclude
    private Book book;

    @Column(nullable = false)
    private int quantity;
}
