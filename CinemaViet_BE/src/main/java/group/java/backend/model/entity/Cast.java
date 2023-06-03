package group.java.backend.model.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cast")
@Data
@NoArgsConstructor
public class Cast {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "cast_name")
	private String castName;
	
	@Column(name = "image")
	private String image;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "movie_cast_id")
	private Set<MovieCast> casts = new HashSet<>();

	
}
