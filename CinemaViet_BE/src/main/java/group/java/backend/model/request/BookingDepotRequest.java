package group.java.backend.model.request;

import java.util.List;

import lombok.Data;

@Data
public class BookingDepotRequest {
	private List<String> lstSeat;
	private int movieId;
	private int movieDayId;
	private int roomId;
	private int seatId;
	private String orderDate;
	private int discount;
	private int status;
	private String userId;
}
