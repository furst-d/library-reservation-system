package org.furstd.web_api.repository;

import org.furstd.web_api.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAppUserRepository extends JpaRepository<AppUser, Integer> {
    AppUser findById(int id);
    AppUser findByEmail(String email);
}
