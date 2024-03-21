package org.furstd.web_api.service.user;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.AuthenticationResponseDTO;
import org.furstd.web_api.dto.LoginDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Role;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.repository.IAppUserRepository;
import org.furstd.web_api.repository.IRoleRepository;
import org.furstd.web_api.service.jwt.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
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
}
