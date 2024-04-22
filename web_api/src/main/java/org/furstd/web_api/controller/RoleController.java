package org.furstd.web_api.controller;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.service.role.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("roles")
@RestController
@RequiredArgsConstructor
public class RoleController extends BaseController<Book>{
    private final RoleService roleService;

    @RequestMapping("")
    public ResponseEntity<Object> getRoles() {
        return ResponseEntity.ok(roleService.findAll());
    }
}
