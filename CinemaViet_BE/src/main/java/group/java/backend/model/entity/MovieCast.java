package group.java.backend.model.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "movie_cast")
@Data
@NoArgsConstructor
public class MovieCast {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name ="movie_id")
	private Movie movie; 
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name ="cast_id")
	private Cast cast; 
}
