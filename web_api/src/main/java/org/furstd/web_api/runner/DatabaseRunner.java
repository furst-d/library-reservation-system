package org.furstd.web_api.runner;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.entity.Role;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.repository.IRoleRepository;
import org.furstd.web_api.service.user.IUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class DatabaseRunner implements CommandLineRunner {
    private final IUserService userService;
    private final IRoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        Role admin = new Role("admin");
        Role user = new Role("user");
        roleRepository.save(admin);
        roleRepository.save(user);

        AppUser adminUser = new AppUser("admin@test.cz", "test", "Dominik", "Fűrst", Date.from(LocalDate.of(2000, 4, 3).atStartOfDay(ZoneId.systemDefault()).toInstant()));
        adminUser.addRole(admin);
        userService.createUser(adminUser);
    }
}
