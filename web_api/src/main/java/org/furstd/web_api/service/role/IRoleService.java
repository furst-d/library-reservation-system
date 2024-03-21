package org.furstd.web_api.service.role;

import org.furstd.web_api.entity.Role;

import java.util.List;

public interface IRoleService {
    List<Role> findByNames(List<String> roles);
}
