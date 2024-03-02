package org.furstd.web_api.runner;

import org.furstd.web_api.entity.Role;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.repository.IRoleRepository;
import org.furstd.web_api.repository.IAppUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Component
public class DatabaseRunner implements CommandLineRunner {
    private final IAppUserRepository userRepository;
    private final IRoleRepository roleRepository;

    public DatabaseRunner(IAppUserRepository userRepository, IRoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        Role admin = new Role("admin");
        Role user = new Role("user");
        roleRepository.save(admin);
        roleRepository.save(user);

        AppUser adminUser = new AppUser("admin@test.cz", "test", "Dominik", "Fűrst", Date.from(LocalDate.of(2000, 4, 3).atStartOfDay(ZoneId.systemDefault()).toInstant()));
        adminUser.addRole(admin);
        adminUser.addRole(user);
        userRepository.save(adminUser);
    }
}
