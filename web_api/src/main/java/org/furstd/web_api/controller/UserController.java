package org.furstd.web_api.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.AppUserDTO;
import org.furstd.web_api.dto.AuthenticationResponseDTO;
import org.furstd.web_api.dto.LoginDTO;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.exceptions.ForbiddenException;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.service.user.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("users")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    private static final String NOT_FOUND_MESSAGE = "User not found!";

    @RequestMapping("{id}")
    public ResponseEntity<Object> getUser(@PathVariable int id) {
        return ResponseEntity.ok(userService.findById(id).orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE)));
    }

    @RequestMapping("{id}/reservations")
    public ResponseEntity<Object> getUserReservations(@PathVariable int id) {
        AppUser user = userService.findById(id).orElseThrow(() -> new NotFoundException(NOT_FOUND_MESSAGE));
        return ResponseEntity.ok(user.getReservations());
    }

    @PostMapping("register")
    public ResponseEntity<Object> registerUser(@Valid @RequestBody AppUserDTO userDTO) {
        userService.findByEmail(userDTO.getEmail()).ifPresent(appUser -> {
            throw new ForbiddenException("Email already exists!");
        });

        AppUser appUser = new AppUser(userDTO.getEmail(), userDTO.getPassword(), userDTO.getFirstName(), userDTO.getLastName(), userDTO.getBirthDate());
        userService.createUser(appUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(new Msg("User was registered successfully!"));
    }

    @PostMapping("login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginDTO loginDTO) {
        AuthenticationResponseDTO response = userService.login(loginDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
