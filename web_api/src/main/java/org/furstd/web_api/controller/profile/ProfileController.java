package org.furstd.web_api.controller.profile;

import org.furstd.web_api.service.user.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("profile")
@RestController
public class ProfileController extends PrivateController {

    public ProfileController(IUserService userService) {
        super(userService);
    }

    @RequestMapping("")
    public ResponseEntity<Object> getProfile() {
        return ResponseEntity.ok(getLoggedUser());
    }
}
