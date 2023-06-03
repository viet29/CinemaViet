package group.java.backend.model.request;

import java.util.List;

import lombok.Data;

@Data
public class MovieRequest {
	private int id;

	private String titile;

	private String description;

	private String thumail;

	private String trailer;

	private int startNumber;

	private String runningTime;

	private String releaseDate;

	private String cast;

	private String rated;

	private String createById;

	private List<SelectOptionRequest> movieCate ;

	private List<SelectOptionRequest> casts;

	private int directorId;
}
