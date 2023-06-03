package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Role;
import group.java.backend.model.response.RoleResponse;

@Service
public interface RoleService {
	Role saveRole(Role role);
	List<Role> getListRole();
	Role getRoleByName(String roleName);
	List<RoleResponse> getAllRole();
	
}
