package group.java.backend.model.request;

import lombok.Data;

@Data
public class RegisterUserRequest {
	
	private String username;
	
	private String fullName;
	
	private String password;
	
	private String phoneNumber;
	
	private String address;
	
	private int gender;
	
	private String email;
	
	private String dateOfBirth;

}
