package org.furstd.web_api.controller.profile;

import org.furstd.web_api.service.book.IBookService;
import org.furstd.web_api.service.user.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("profile")
@RestController
public class ProfileController extends PrivateController {
    private final IBookService bookService;

    public ProfileController(IUserService userService, IBookService bookService) {
        super(userService);
        this.bookService = bookService;
    }

    @RequestMapping("")
    public ResponseEntity<Object> getProfile() {
        return ResponseEntity.ok(getLoggedUser());
    }

    @GetMapping("recommend")
    public ResponseEntity<Object> recommendBooks() {
        return ResponseEntity.ok(bookService.generateRecommendations(getLoggedUser()));
    }
}
