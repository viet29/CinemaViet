package group.java.backend.model.request;

import lombok.Data;

@Data
public class SeatRequest {
	private int id;

	private String stand;

	private int isVip;
}
