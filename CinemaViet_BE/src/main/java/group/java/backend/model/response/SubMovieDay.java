package group.java.backend.model.response;

import java.util.List;

import lombok.Data;

@Data
public class SubMovieDay {
	private String showDate;
	private List<SubDay> lstShowTime;
}
