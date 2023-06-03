package group.java.backend.model.response;

import lombok.Data;

@Data
public class CategoryResponse {
	private int categoryId;
	private String parentCateName;
	private int parentCateId;
	private int status;
	private String categoryName;
	private String createByUserName;
	private String createByUserId;
	private String createByUserEmail;

}
