package group.java.backend.model.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
public class User {
	@Id
	private String UserId;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Column(name = "full_name")
	private String fullName;

	@Column(name = "email")
	private String email;

	@Column(name = "phone_number")
	private String phoneNumber;

	@Column(name = "address")
	private String address;

	@Column(name = "gender")
	private int gender;
	
	@Column(name = "date_of_birth")
	private Date dateOfBirth;

	@OneToMany
	@JoinColumn(name = "category_id")
	private List<Category> category;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "movie_id")
	private List<Movie> movie;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "booking_depots_id")
	private List<BookingDepot> bookingDepots;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();


	public User(String username, String password, String fullName, String email, String phoneNumber, String address,
			int gender , Date dob) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.gender = gender;
		this.dateOfBirth = dob;
	}
}
