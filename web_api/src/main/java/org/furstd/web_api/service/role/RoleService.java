package org.furstd.web_api.service.role;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.dto.ListResponseDTO;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Role;
import org.furstd.web_api.repository.IRoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {
    private final IRoleRepository roleRepository;

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public List<Role> findByNames(List<String> roles) {
        return roleRepository.findByNames(roles);
    }
}
