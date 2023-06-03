package group.java.backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Role;
import group.java.backend.model.entity.User;
import group.java.backend.model.response.UserInfoResponse;
import group.java.backend.repository.RoleRepository;
import group.java.backend.repository.UserRepository;
import group.java.backend.service.UserService;
import group.java.backend.utils.ObjectUtils;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private RoleRepository roleRepo;

	private final PasswordEncoder passwrordEncoder = new BCryptPasswordEncoder();

	@Override
	public List<UserInfoResponse> getAllListUser() {
		List<User> lst = userRepo.findAll();
		List<UserInfoResponse> lstRespon = new ArrayList<UserInfoResponse>();
		if (lst.size() > 0) {
			for (User user : lst) {
				UserInfoResponse userRespon = new UserInfoResponse();
				userRespon.setAddress(user.getAddress());
				userRespon.setEmail(user.getEmail());
				userRespon.setFullName(user.getFullName());
				userRespon.setUserName(user.getUsername());
				userRespon.setUserId(user.getUserId());
				userRespon.setGender(user.getGender());
				userRespon.setDateOfBirth(user.getDateOfBirth().toString().split(" ", 2)[0]);
				List<Role> roles = new ArrayList<Role>(user.getRoles());
				userRespon.setRoles(roles);
				userRespon.setPhoneNumber(user.getPhoneNumber());
				lstRespon.add(userRespon);
			}

			return lstRespon;
		}

		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserInfoResponse saveUser(User user , int status) {
		if(status == 1) {
			user.setUserId(ObjectUtils.getUUId());
			user.setPassword(passwrordEncoder.encode(user.getPassword()));
		}
		try {
			User newUser = userRepo.save(user);
			return convertToReponse(newUser);
		} catch (Exception e) {
			// TODO: handle exception
		}
		// TODO Auto-generated method stub
		return null;
	}
	

	@Override
	public void addRoleToUser(String username, String roleName) {
		User user = userRepo.findByUsername(username);
		Role role = roleRepo.findByRoleName(roleName);

		user.getRoles().add(role);
		// TODO Auto-generated method stub
	}

	@Override
	public User getUser(String username) {
		User user = userRepo.findByUsername(username);
		if (user != null) {
			return user;
		}

		return null;
	}

	@Override
	public UserInfoResponse getUserInfoByUserName(String userName) {
		User user = userRepo.findByUsername(userName);
		if (user != null) {
			UserInfoResponse userInfo = new UserInfoResponse();

			userInfo.setUserId(user.getUserId());
			userInfo.setAddress(user.getAddress());
			userInfo.setEmail(user.getEmail());
			userInfo.setUserName(user.getUsername());
			userInfo.setFullName(user.getFullName());
			userInfo.setPhoneNumber(user.getPhoneNumber());
			userInfo.setGender(user.getGender());

			List<Role> roles = new ArrayList<Role>(user.getRoles());
			userInfo.setRoles(roles);

			return userInfo;
		}
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserInfoResponse UpdateUser(User user) {
		User userAfterUpdate = userRepo.save(user);

		return convertToReponse(userAfterUpdate);
	}

	@Override
	public UserInfoResponse getUserById(String userID) {
		Optional<User> checkUser = userRepo.findById(userID);

		if (checkUser.isPresent()) {
			User user = checkUser.get();
			UserInfoResponse userInfo = convertToReponse(user);

			return userInfo;
		}

		return null;
	}

	public UserInfoResponse convertToReponse(User user) {
		if (user != null) {
			UserInfoResponse userInfo = new UserInfoResponse();

			userInfo.setUserId(user.getUserId());
			userInfo.setAddress(user.getAddress());
			userInfo.setEmail(user.getEmail());
			userInfo.setUserName(user.getUsername());
			userInfo.setFullName(user.getFullName());
			userInfo.setPhoneNumber(user.getPhoneNumber());
			userInfo.setGender(user.getGender());
			userInfo.setDateOfBirth(user.getDateOfBirth().toString().split(" " , 2)[0]);

			List<Role> roles = new ArrayList<Role>(user.getRoles());
			userInfo.setRoles(roles);

			return userInfo;
		}
		return null;
	}

	@Override
	public User getCreateByUser(String userID) {
		Optional<User> checkUser = userRepo.findById(userID);

		if (checkUser.isPresent()) {
			User user = checkUser.get();

			return user;
		}

		return null;
	}
}
