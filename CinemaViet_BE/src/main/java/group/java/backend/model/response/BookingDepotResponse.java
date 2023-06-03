package group.java.backend.model.response;

import lombok.Data;

@Data
public class BookingDepotResponse {
	private int bookingId;
	private int movieDayId;
	private int movieId;
	private int status;
	private int roomId;
	private String seatName;
	private String roomName;
	private String movieName;
	private String userId;
	private String userFullName;
	private String email;
	private String showDate;
	private String showTime;
	private String orderDate;

}
