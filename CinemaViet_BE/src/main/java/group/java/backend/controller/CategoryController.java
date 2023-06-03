package group.java.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.java.backend.model.entity.Category;
import group.java.backend.model.entity.User;
import group.java.backend.model.request.CategoryRequest;
import group.java.backend.model.response.CategoryResponse;
import group.java.backend.service.CategoryService;
import group.java.backend.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CategoryController {
	@Autowired
	private CategoryService categoryService;

	@Autowired
	private UserService userService;

	@GetMapping("/staff/categories")
	public ResponseEntity<?> getListCategory() {
		List<CategoryResponse> response = categoryService.listCategory();

		return ResponseEntity.ok().body(response);
	}
	
	@GetMapping("/admin/categories/parent")
	public ResponseEntity<?> getListParentCategory() {
		List<CategoryResponse> response = categoryService.getParentCategory();

		return ResponseEntity.ok().body(response);
	}

	@PostMapping("/admin/cate/checkDuplicate")
	public ResponseEntity<?> checkExist(@RequestBody CategoryRequest request) {

		CategoryResponse res = categoryService.checkDuplicate(request.getCategoryName().trim());

		if (res != null) {
			return ResponseEntity.ok().body("Category Name is Existed");
		} 
		return ResponseEntity.ok().body("");
	}

	@GetMapping("/admin/category/{id}")
	public ResponseEntity<?> getCategory(@PathVariable("id") int cateId) {
		CategoryResponse response = categoryService.getCategory(cateId);

		return ResponseEntity.ok().body(response);
	}

	@PostMapping("/admin/category/save")
	public ResponseEntity<?> SaveCate(@RequestBody CategoryRequest request) {
		if (request != null) {
			User createBy = userService.getCreateByUser(request.getCreateBy());
			Category cate = new Category();
			if (request.getCategoryId() > 0) {
				cate.setId(request.getCategoryId());
			}
			if (createBy != null) {
				cate.setCreateBy(createBy);
			}

			cate.setCateName(request.getCategoryName());
			cate.setStatus(request.getStatus());
			cate.setParentID(String.valueOf(request.getParentCate()));

			CategoryResponse cateResult = categoryService.saveCategory(cate);

			if (cateResult != null) {
				return ResponseEntity.ok().body(cateResult);
			} else {
				return ResponseEntity.badRequest().body("Save Category Failed!");
			}

		}

		return ResponseEntity.badRequest().body("Save Category Failed!");
	}

	@PostMapping("/admin/category/delete/{id}")
	public ResponseEntity<?> DeleteCategory(@PathVariable("id") int cateId) {
		Boolean result = categoryService.deleteCategory(cateId);

		if (result) {
			return ResponseEntity.ok().body("Delete Success!");
		} else {
			return ResponseEntity.badRequest().body("Save Category Failed!");
		}
	}

}
