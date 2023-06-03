package group.java.backend.model.request;

import lombok.Data;

@Data
public class DirectorRequest {
	private int directorId;
	private String directorName;
	private String directorImage;
}
