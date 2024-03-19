package org.furstd.web_api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.furstd.web_api.dto.AuthenticationResponseDTO;
import org.furstd.web_api.dto.LoginDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.security.configuration.SecurityConfiguration;
import org.furstd.web_api.service.jwt.IJwtService;
import org.furstd.web_api.service.user.IUserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@Import(SecurityConfiguration.class)
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private IUserService userService;

    @MockBean
    private IJwtService jwtService;

    @MockBean
    private AuthenticationProvider authenticationprovider;

    @Test
    void loginSuccessTest() throws Exception {
        LoginDTO loginDTO = new LoginDTO("user@example.com", "password");
        AppUser user = new AppUser("user@example.com", "password", "John", "Doe", new Date());
        AuthenticationResponseDTO responseDTO = new AuthenticationResponseDTO("token123", user);

        given(userService.login(any(LoginDTO.class))).willReturn(responseDTO);

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(loginDTO)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.code").value(201))
                .andExpect(jsonPath("$.payload.token").value("token123"))
                .andExpect(jsonPath("$.payload.user.email").value("user@example.com"))
                .andExpect(jsonPath("$.payload.user.firstName").value("John"))
                .andExpect(jsonPath("$.payload.user.lastName").value("Doe"));
    }
}