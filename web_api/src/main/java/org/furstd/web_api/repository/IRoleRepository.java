package org.furstd.web_api.repository;

import org.furstd.web_api.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);

    @Query("SELECT r FROM Role r WHERE r.name IN :roles")
    List<Role> findByNames(List<String> roles);
}
