package org.furstd.web_api.controller.profile;

import org.furstd.web_api.dto.ChangePasswordDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.model.util.Msg;
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

    @PostMapping("change-password")
    public ResponseEntity<Object> changePassword(@RequestBody ChangePasswordDTO changePasswordDTO) {
        AppUser user = getLoggedUser();
        userService.changePassword(user, changePasswordDTO.getOldPassword(), changePasswordDTO.getNewPassword());
        return ResponseEntity.ok(new Msg("Password was changed successfully!"));
    }
}
