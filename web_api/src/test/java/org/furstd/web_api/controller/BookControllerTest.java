package org.furstd.web_api.controller;

import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.model.author.Nationality;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;
import org.furstd.web_api.security.configuration.CustomAuthenticationEntryPoint;
import org.furstd.web_api.security.configuration.SecurityConfiguration;
import org.furstd.web_api.service.author.IAuthorService;
import org.furstd.web_api.service.book.IBookService;
import org.furstd.web_api.service.jwt.IJwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = BookController.class)
@Import(SecurityConfiguration.class)
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IBookService bookService;

    @MockBean
    private IAuthorService authorService;

    @MockBean
    private IJwtService jwtService;

    @MockBean
    private AuthenticationProvider authenticationprovider;

    @MockBean
    private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Test
    void getBooksTest() throws Exception {
        Author author = new Author("John", "Doe", new Date(), Nationality.AMERICAN);
        Book bookOne = new Book("Book One", author, Genre.FANTASY, Language.ENGLISH, 300, 2020, 5, "http://image.link/bookone.jpg");
        Book bookTwo = new Book("Book Two", author, Genre.SCIENCE, Language.FRENCH, 250, 2018, 3, "http://image.link/booktwo.jpg");
        List<Book> books = Arrays.asList(bookOne, bookTwo);
        given(bookService.findAll()).willReturn(books);

        mockMvc.perform(get("/books")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()) // HTTP status OK (200)
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("ok"))
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.payload.length()").value(2)) // Ověření, že payload obsahuje 2 knihy
                .andExpect(jsonPath("$.payload[0].title").value("Book One"))
                .andExpect(jsonPath("$.payload[0].author.firstName").value("John"))
                .andExpect(jsonPath("$.payload[0].author.lastName").value("Doe"))
                .andExpect(jsonPath("$.payload[0].genre").value(Genre.FANTASY.toString()))
                .andExpect(jsonPath("$.payload[0].language").value(Language.ENGLISH.toString()))
                .andExpect(jsonPath("$.payload[1].title").value("Book Two"))
                .andExpect(jsonPath("$.payload[1].genre").value(Genre.SCIENCE.toString()));
    }
}