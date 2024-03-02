package org.furstd.web_api.service.user;

import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.repository.IAppUserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    private final IAppUserRepository userRepository;

    public UserService(IAppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void createUser(AppUser appUser) {
        userRepository.save(appUser);
    }

    @Override
    public AppUser findById(int id) {
        return userRepository.findById(id);
    }
}
