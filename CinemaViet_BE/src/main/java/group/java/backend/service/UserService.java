package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.User;
import group.java.backend.model.response.UserInfoResponse;

@Service
public interface UserService {
	UserInfoResponse saveUser(User user , int status);
	List<UserInfoResponse> getAllListUser();
	void addRoleToUser(String username , String roleName);
	User getUser(String username);
	UserInfoResponse getUserInfoByUserName(String userName);
	UserInfoResponse UpdateUser(User user);
	UserInfoResponse getUserById(String userID);
	User getCreateByUser(String userID);
}
