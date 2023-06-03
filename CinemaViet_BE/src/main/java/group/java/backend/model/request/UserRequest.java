package group.java.backend.model.request;

import lombok.Data;

@Data
public class UserRequest {
	
	private String userId;
	
	private String username;

	private String fullName;

	private String password;

	private String phoneNumber;

	private String address;

	private int gender;

	private String email;
	
	private String dateOfBirth;
}
