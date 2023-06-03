package group.java.backend.model.request;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class RoleToUserRequest {
	private String username;
	
	private String roleName;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
	
}
