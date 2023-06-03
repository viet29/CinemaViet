package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Category;
import group.java.backend.model.response.CategoryResponse;

@Service
public interface CategoryService {
	List<CategoryResponse> listCategory();
	CategoryResponse getCategory(int cateId);
	CategoryResponse saveCategory(Category cate );
	Boolean deleteCategory(int cateId);
	List<CategoryResponse> getParentCategory();
	CategoryResponse checkDuplicate(String castName);
}
