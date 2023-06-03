package group.java.backend.model.response;

import java.util.List;

import lombok.Data;

@Data
public class MovieDayDisplayClientResponse {
	private int movieId;
	private int movieDayId;
	private List<SubMovieDay> lstSubMovied;
	private String movieName;
	private String showTime;
	private int roomId;
	private String roomName;
	
}
