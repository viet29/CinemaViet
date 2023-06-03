package group.java.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.java.backend.model.response.RoleResponse;
import group.java.backend.service.RoleService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class RoleController {
	@Autowired
	private RoleService roleService;
	
	@GetMapping("/staff/roles")
	public ResponseEntity<?> getListRoles() {
		List<RoleResponse> lstRes = roleService.getAllRole();
		return ResponseEntity.ok().body(lstRes);
	}
}
