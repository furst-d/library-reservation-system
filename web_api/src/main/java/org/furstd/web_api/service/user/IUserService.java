package org.furstd.web_api.service.user;

import org.furstd.web_api.entity.AppUser;

public interface IUserService {
    void createUser(AppUser appUser);
    AppUser findById(int id);
}
