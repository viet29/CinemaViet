package group.java.backend.model.response;

import java.util.List;

import lombok.Data;

@Data
public class MovieResponse {

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
	
	private String createByName;
	
	private String createByEmail;

	private List<CategoryResponse> movieCate ;

	private List<CastResponse> casts;

	private int directorId;
	
	private String directorName;
	
	private String directorImage;
}
