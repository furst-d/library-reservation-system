package org.furstd.web_api.controller.profile;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.exceptions.NotFoundException;
import org.furstd.web_api.service.user.IUserService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PrivateController {
    protected final IUserService userService;
    private static final String USER_NOT_FOUND_MESSAGE = "User not found!";

    public AppUser getLoggedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        String username = principal instanceof UserDetails principalDetails ? principalDetails.getUsername() : principal.toString();

        return userService.findByEmail(username)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND_MESSAGE));

    }
}
