package org.furstd.web_api.service.user;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.AuthenticationResponseDTO;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.dto.LoginDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Role;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.repository.IAppUserRepository;
import org.furstd.web_api.repository.IRoleRepository;
import org.furstd.web_api.service.IFilterService;
import org.furstd.web_api.service.jwt.JwtService;
import org.furstd.web_api.specification.UserSpecification;
import org.furstd.web_api.util.FilterCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService, IFilterService<AppUser> {
    private final IAppUserRepository userRepository;
    private final IRoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public void createUser(AppUser appUser) {
        Role role = roleRepository.findByName("USER").orElseThrow(() -> new NotFoundException("Role not found"));
        appUser.addRole(role);
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        userRepository.save(appUser);
    }

    @Override
    public void createUser(AppUser appUser, List<Role> roles) {
        setRoles(appUser, roles);
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        userRepository.save(appUser);
    }

    @Override
    public void updateUser(AppUser appUser) {
        appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
        userRepository.save(appUser);
    }

    @Override
    public void deleteUser(AppUser appUser) {
        userRepository.delete(appUser);
    }

    @Override
    public AuthenticationResponseDTO login(LoginDTO loginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword())
        );

        AppUser appUser = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new NotFoundException("User not found"));

        return AuthenticationResponseDTO
                .builder()
                .token(jwtService.generateToken(appUser))
                .user(appUser)
                .build();
    }

    @Override
    public Optional<AppUser> findById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<AppUser> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void setRoles(AppUser appUser, List<Role> roles) {
        appUser.removeRoles();
        for (Role role : roles) {
            appUser.addRole(role);
        }
    }

    @Override
    public ListResponseDTO<AppUser> findAll(Specification<AppUser> spec, Pageable pageable) {
        Page<AppUser> users = userRepository.findAll(spec, pageable);
        return new ListResponseDTO<>(users.getTotalElements(), users.getContent());
    }

    @Override
    public void changePassword(AppUser user, String oldPassword, String newPassword) {
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new NotFoundException("Old password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public Specification<AppUser> applyFilter(Specification<AppUser> spec, FilterCriteria criteria) {
        if (!criteria.getValue().isEmpty()) {
            String value = criteria.getValue();
            return switch (criteria.getName()) {
                case "email" -> spec.and(UserSpecification.hasEmail(value));
                case "lastName" -> spec.and(UserSpecification.hasLastName(value));
                default -> spec;
            };
        }
        return spec;
    }
}
