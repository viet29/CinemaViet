package group.java.backend.model.request;

import lombok.Data;

@Data
public class CategoryRequest {
	private int categoryId;
	private int parentCate;
	private int status;
	private String categoryName;
	private String createBy;
}
