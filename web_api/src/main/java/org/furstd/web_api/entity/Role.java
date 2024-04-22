package org.furstd.web_api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @Column(nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private List<AppUser> appUsers;

    public Role(String name) {
        this.name = name;
    }
}
