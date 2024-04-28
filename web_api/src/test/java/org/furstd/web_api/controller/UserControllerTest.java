package org.furstd.web_api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.furstd.web_api.dto.AuthenticationResponseDTO;
import org.furstd.web_api.dto.CreateAppUserDTO;
import org.furstd.web_api.dto.LoginDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.entity.Role;
import org.furstd.web_api.security.configuration.CustomAuthenticationEntryPoint;
import org.furstd.web_api.security.configuration.SecurityConfiguration;
import org.furstd.web_api.service.jwt.IJwtService;
import org.furstd.web_api.service.role.IRoleService;
import org.furstd.web_api.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@Import(SecurityConfiguration.class)
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private IRoleService roleService;

    @MockBean
    private IJwtService jwtService;

    @MockBean
    private AuthenticationProvider authenticationprovider;

    @MockBean
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Test
    void loginSuccessTest() throws Exception {
        LoginDTO loginDTO = new LoginDTO("user@example.com", "password");
        AppUser user = new AppUser("user@example.com", "password", "John", "Doe", new Date());
        AuthenticationResponseDTO responseDTO = new AuthenticationResponseDTO("token123", user);

        given(userService.login(any(LoginDTO.class))).willReturn(responseDTO);

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(loginDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.payload.token").value("token123"))
                .andExpect(jsonPath("$.payload.user.email").value("user@example.com"))
                .andExpect(jsonPath("$.payload.user.firstName").value("John"))
                .andExpect(jsonPath("$.payload.user.lastName").value("Doe"));
    }

    @Test
    @WithMockUser(username="admin", authorities={"ADMIN"})
    void updateUserSuccessTest() throws Exception {
        CreateAppUserDTO userDTO = new CreateAppUserDTO("updateduser@example.com", "newpassword", "Updated", "User", new Date(), Arrays.asList("USER", "EDITOR"));
        AppUser existingUser = new AppUser("user@example.com", "password", "User", "User", new Date());
        List<Role> roles = Arrays.asList(new Role("USER"), new Role("EDITOR"));

        given(userService.findById(anyInt())).willReturn(Optional.of(existingUser));
        given(roleService.findByNames(any(List.class))).willReturn(roles);

        mockMvc.perform(put("/users/{id}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(userDTO)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.payload.message").value("User was updated successfully!"));
    }

    @Test
    @WithMockUser(username="admin", authorities={"ADMIN"})
    void deleteUserSuccessTest() throws Exception {
        AppUser existingUser = new AppUser("user@example.com", "password", "User", "User", new Date());
        given(userService.findById(anyInt())).willReturn(Optional.of(existingUser));

        mockMvc.perform(delete("/users/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.payload.message").value("User was deleted successfully!"));
    }

    @Test
    @WithMockUser(username="editor", authorities={"EDITOR"})
    void getUserSuccessTest() throws Exception {
        AppUser existingUser = new AppUser("user@example.com", "password", "User", "User", new Date());
        given(userService.findById(anyInt())).willReturn(Optional.of(existingUser));

        mockMvc.perform(get("/users/{id}", 1))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.payload.email").value("user@example.com"))
                .andExpect(jsonPath("$.payload.firstName").value("User"))
                .andExpect(jsonPath("$.payload.lastName").value("User"));
    }
}