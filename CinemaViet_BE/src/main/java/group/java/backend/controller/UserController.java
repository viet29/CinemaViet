package group.java.backend.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.java.backend.model.entity.User;
import group.java.backend.model.request.RegisterUserRequest;
import group.java.backend.model.request.UserRequest;
import group.java.backend.model.response.UserInfoResponse;
import group.java.backend.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
	@Autowired
	private UserService userService;

//	@PreAuthorize("hasRole('Role_Admin')")
	@GetMapping("/staff/users")
	public ResponseEntity<List<UserInfoResponse>> getUsers() {
		return ResponseEntity.ok().body(userService.getAllListUser());
	}

	@PostMapping("/register")
	public ResponseEntity<?> RegisterUser(@RequestBody RegisterUserRequest requestUser) {
		try {
			User user = new User();

			user.setAddress(requestUser.getAddress());
			user.setEmail(requestUser.getEmail());
			user.setFullName(requestUser.getFullName());
			user.setPhoneNumber(requestUser.getPhoneNumber());
			user.setPassword(requestUser.getPassword());
			user.setUsername(requestUser.getUsername());

			if (requestUser.getDateOfBirth() != null) {
				Date dob = Date.from(
						LocalDate.parse(requestUser.getDateOfBirth()).atStartOfDay(ZoneId.systemDefault()).toInstant());
				user.setDateOfBirth(dob);
			} else {
				user.setDateOfBirth(new Date());
			}

			if (requestUser.getGender() > 0) {
				user.setGender(requestUser.getGender());
			} else {
				user.setGender(1);
			}

			UserInfoResponse userRegister = userService.saveUser(user , 1);

			if (userRegister != null) {
				userService.addRoleToUser(userRegister.getUserName(), "Role_Client");
			}

			return ResponseEntity.ok().body(userRegister);

		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Register User fail");
		}

	}

	@GetMapping("/admin/user/{id}")
	public ResponseEntity<UserInfoResponse> getUserById(@PathVariable("id") String id) {
		return ResponseEntity.ok().body(userService.getUserById(id));
	}
	
	@GetMapping("/user/{username}")
	public ResponseEntity<UserInfoResponse> getUserByIdToClient(@PathVariable("username") String userName) {
		return ResponseEntity.ok().body(userService.getUserInfoByUserName(userName));
	}
	
	@GetMapping("/view/{username}")
	public ResponseEntity<?> checkDuplicateUserName(@PathVariable("username") String userName) {
		UserInfoResponse response = userService.getUserInfoByUserName(userName);
		
		if(response != null) {
			return ResponseEntity.ok().body("UserName is exist");
		}
		
		return ResponseEntity.ok().body("");
		
	}

	@PostMapping("/admin/user/update")
	public ResponseEntity<?> UpdateUser(@RequestBody UserRequest requestUser) {
		try {
			User user = userService.getCreateByUser(requestUser.getUserId());
			
			user.setAddress(requestUser.getAddress());
			user.setEmail(requestUser.getEmail());
			user.setFullName(requestUser.getFullName());
			user.setPhoneNumber(requestUser.getPhoneNumber());
			user.setUsername(requestUser.getUsername());

			if (requestUser.getDateOfBirth() != null) {
				Date dob = Date.from(
						LocalDate.parse(requestUser.getDateOfBirth()).atStartOfDay(ZoneId.systemDefault()).toInstant());
				user.setDateOfBirth(dob);
			} else {
				user.setDateOfBirth(new Date());
			}

			if (requestUser.getGender() > 0) {
				user.setGender(requestUser.getGender());
			} else {
				user.setGender(1);
			}

			UserInfoResponse userRegister = userService.UpdateUser(user);

			return ResponseEntity.ok().body(userRegister);

		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Register User fail");
		}

	}
	
	@PostMapping("/user/update")
	public ResponseEntity<?> UpdateUserProfile(@RequestBody UserRequest requestUser) {
		try {
			User user = userService.getCreateByUser(requestUser.getUserId());
			
			user.setAddress(requestUser.getAddress());
			user.setEmail(requestUser.getEmail());
			user.setFullName(requestUser.getFullName());
			user.setPhoneNumber(requestUser.getPhoneNumber());
			user.setUsername(requestUser.getUsername());

			if (requestUser.getDateOfBirth() != null) {
				Date dob = Date.from(
						LocalDate.parse(requestUser.getDateOfBirth()).atStartOfDay(ZoneId.systemDefault()).toInstant());
				user.setDateOfBirth(dob);
			} else {
				user.setDateOfBirth(new Date());
			}

			if (requestUser.getGender() > 0) {
				user.setGender(requestUser.getGender());
			} else {
				user.setGender(1);
			}

			UserInfoResponse userRegister = userService.UpdateUser(user);

			return ResponseEntity.ok().body(userRegister);

		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Register User fail");
		}

	}
	
	@GetMapping("/super_admin/up_role_admin/{id}")
	public ResponseEntity<?> upRoleUserAdmin(@PathVariable("id") String userId){
		User user = userService.getCreateByUser(userId);
		
		user.getRoles().clear();
		
		userService.addRoleToUser(user.getUsername(), "Role_Admin");
		
		return ResponseEntity.ok().body("Up Role Success");
	}
	
	@GetMapping("/super_admin/up_role_staff/{id}")
	public ResponseEntity<?> upRoleUserStaff(@PathVariable("id") String userId){
		User user = userService.getCreateByUser(userId);
		
		user.getRoles().clear();
		
		userService.addRoleToUser(user.getUsername(), "Role_staff");
		
		return ResponseEntity.ok().body("Up Role Success");
	}
	
	@GetMapping("/super_admin/down_role/{id}")
	public ResponseEntity<?> downRoleUser(@PathVariable("id") String userId){
		User user = userService.getCreateByUser(userId);
		
		user.getRoles().clear();
		
		userService.addRoleToUser(user.getUsername(), "Role_Client");
		
		return ResponseEntity.ok().body("Down Role Success");
	}

	@GetMapping("/admin/refreshtoken")
	public void RefreshToken(HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest) {
		httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);
	}

}
