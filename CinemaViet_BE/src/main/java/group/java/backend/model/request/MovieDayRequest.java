package group.java.backend.model.request;

import lombok.Data;

@Data
public class MovieDayRequest {
	private int id;
	private int movieId;
	public String showDate;
	public String ShowTime;
	private int roomId;
}
