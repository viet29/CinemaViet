package group.java.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Role;
import group.java.backend.model.response.RoleResponse;
import group.java.backend.repository.RoleRepository;
import group.java.backend.service.RoleService;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository roleRepo;

	@Override
	public Role saveRole(Role role) {
		Role newRole = roleRepo.save(role);
		return newRole;
	}

	@Override
	public List<Role> getListRole() {
		return roleRepo.findAll();
	}

	@Override
	public Role getRoleByName(String roleName) {
		Role role = roleRepo.findByRoleName(roleName);
		return role;
	}

	@Override
	public List<RoleResponse> getAllRole() {
		List<RoleResponse> lstRespon = converToRespon(roleRepo.findAll());
		// TODO Auto-generated method stub
		return lstRespon;
	}

	public List<RoleResponse> converToRespon(List<Role> roles) {
		List<RoleResponse> lstRespon = new ArrayList<RoleResponse>();
		if (roles != null && roles.size() > 0) {
			for (Role r : roles) {
				RoleResponse respon = new RoleResponse();
				respon.setRoleId(r.getRoleId());
				respon.setRoleName(r.getRoleName());

				lstRespon.add(respon);
			}
		}
		return lstRespon;
	}
}
