package org.furstd.web_api.controller;

import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.service.user.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("users")
@RestController
public class UserController {
    private final IUserService userService;

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @RequestMapping("{id}")
    public AppUser getUser(@PathVariable int id) {
        return userService.findById(id);
    }

    @PostMapping("")
    public ResponseEntity<AppUser> registerUser(@RequestBody AppUser appUser) {
        userService.createUser(appUser);
        return new ResponseEntity<>(appUser, HttpStatus.CREATED);
    }
}
