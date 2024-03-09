package org.furstd.web_api.service.user;

import org.furstd.web_api.dto.AuthenticationResponseDTO;
import org.furstd.web_api.dto.LoginDTO;
import org.furstd.web_api.entity.AppUser;

import java.util.Optional;

public interface IUserService {
    void createUser(AppUser appUser);
    AuthenticationResponseDTO login(LoginDTO loginDTO);
    Optional<AppUser> findById(int id);

    Optional<AppUser> findByEmail(String email);
}
