package org.furstd.web_api.service.user;

import org.furstd.web_api.dto.AuthenticationResponseDTO;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.dto.LoginDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Role;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    void createUser(AppUser appUser);
    void updateUser(AppUser appUser);
    void deleteUser(AppUser appUser);
    AuthenticationResponseDTO login(LoginDTO loginDTO);
    Optional<AppUser> findById(int id);

    Optional<AppUser> findByEmail(String email);

    void setRoles(AppUser appUser, List<Role> roles);

    ListResponseDTO<AppUser> findAll(Specification<AppUser> spec, Pageable pageable);

    void changePassword(AppUser user, String oldPassword, String newPassword);
}
