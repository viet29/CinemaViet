package group.java.backend.model.response;

import java.util.List;

import group.java.backend.model.entity.Role;
import lombok.Data;

@Data
public class UserInfoResponse {
	private String userId;
	private String userName;
	private String fullName;
	private String email;
	private String phoneNumber;
	private String address;
	private int gender;
	private List<Role> roles;
	private String dateOfBirth;
}
