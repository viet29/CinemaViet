package group.java.backend.model.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "booking_depot")
@Data
@NoArgsConstructor
public class BookingDepot {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "movie_id")
	private int movieId;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;
	
	@Column(name = "user_id" , insertable = false , updatable = false)
	private String userId;

	@Column(name = "order_date")
	private Date orderDate;

	@Column(name = "discount")
	private int discount;

	@Column(name = "status")
	private int status;

	@Column(name = "seat_id")
	private int seatId;
	
	@Column(name = "seat_name")
	private String seatName;

	@Column(name = "room_id")
	private int roomId;
	
	@Column(name = "movie_day_id")
	private int movieDayId;
}
