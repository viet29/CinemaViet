package group.java.backend.model.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "movie_day")
@Data
@NoArgsConstructor
public class MovieDay {
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "movie_id")
	private int movieId;
	
	@Column(name = "show_date")
	private Date showDate;
	
	@Column(name = "show_time")
	private String showTime;
	
	@Column(name = "room_id")
	private int roomId;
}
