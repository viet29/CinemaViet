package group.java.backend.model.response;

import lombok.Data;

@Data
public class MovieDayResponse {
	private int id;
	private MovieResponse movieRes;
	public String showDate;
	public String showTime;
	private int roomId;
	private String roomName;
}
