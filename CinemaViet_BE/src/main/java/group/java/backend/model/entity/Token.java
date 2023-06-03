package group.java.backend.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "token")
@Data
public class Token {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "token_key")
	private String tokenKey;
	
	@Column(name = "is_access")
	private Boolean isAccess;
	
	@Column(name = "user_id")
    private String userId;
	
}
