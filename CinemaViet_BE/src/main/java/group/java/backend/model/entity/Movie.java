package group.java.backend.model.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "movie")
@Data
@NoArgsConstructor
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "title")
	private String titile;
	
	@Column(name = "description", columnDefinition="TEXT")
	private String description;
	
	@Column(name = "thumnail")
	private String thumail;
	
	@Column(name = "trailer")
	private String trailer;
	
	@Column(name = "star_number")
	private int startNumber;
	
	@Column(name = "runningTime")
	private String runningTime;
	
	@Column(name = "release_date")
	private Date releaseDate;
	
	@Column(name = "cast")
	private String cast;
	
	@Column(name = "rated")
	private String rated;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User CreateBy;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "movie_category_id")
	private Set<MovieCategory> categories = new HashSet<>();
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "movie_cast_id")
	private Set<MovieCast> casts = new HashSet<>();
	
	@OneToOne
	@JoinColumn(name = "director_id")
	private Director director;

	
}
