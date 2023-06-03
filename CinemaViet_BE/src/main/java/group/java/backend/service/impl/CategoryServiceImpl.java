package group.java.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Category;
import group.java.backend.model.response.CategoryResponse;
import group.java.backend.repository.CategoryRepository;
import group.java.backend.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository cateRepo;

	@Override
	public List<CategoryResponse> listCategory() {
		List<Category> lstCate = cateRepo.findAll(Sort.by(Sort.Direction.DESC , "id"));
		List<CategoryResponse> lstRespon = new ArrayList<CategoryResponse>();
		if (lstCate != null && lstCate.size() > 0) {
			for (Category cate : lstCate) {
				CategoryResponse cateRespon = convertToCategoryResponse(cate);

				if (cateRespon != null) {
					lstRespon.add(cateRespon);
				}
			}
		}
		// TODO Auto-generated method stub
		return lstRespon;
	}

	@Override
	public CategoryResponse getCategory(int cateId) {
		Category cate = cateRepo.getCategoryById(cateId);

		// TODO Auto-generated method stub
		return convertToCategoryResponse(cate);
	}

	@Override
	public CategoryResponse saveCategory(Category cate) {
		Category newCate = cateRepo.save(cate);
		// TODO Auto-generated method stub
		return convertToCategoryResponse(newCate);
	}

	@Override
	public Boolean deleteCategory(int cateId) {
		try {
			Category cate = cateRepo.getCategoryById(cateId);
			if (cate != null) {
				cateRepo.delete(cate);
				return true;
			} else {
				return false;
			}

		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public List<CategoryResponse> getParentCategory() {
		List<Category> lstParentCate = cateRepo.findAll(Sort.by(Sort.Direction.DESC , "id"));
		List<CategoryResponse> lstRespon = new ArrayList<CategoryResponse>();
		if (lstParentCate != null && lstParentCate.size() > 0) {
			for (Category cate : lstParentCate) {
				if (cate.getParentID().equals("0")) {
					CategoryResponse cateRespon = convertToCategoryResponse(cate);
					if (cateRespon != null) {
						lstRespon.add(cateRespon);
					}
				}

			}
		}
		// TODO Auto-generated method stub
		return lstRespon;
	}

	public CategoryResponse convertToCategoryResponse(Category cate) {

		if (cate != null) {
			CategoryResponse cateRespon = new CategoryResponse();

			cateRespon.setCategoryId(cate.getId());
			cateRespon.setCategoryName(cate.getCateName());
			cateRespon.setCreateByUserName(cate.getCreateBy().getFullName());
			cateRespon.setCreateByUserId(cate.getCreateBy().getUserId());
			cateRespon.setCreateByUserEmail(cate.getCreateBy().getEmail());
			cateRespon.setStatus(cate.getStatus());

			if (cate.getParentID() != null) {
				Category parentCate = cateRepo.getCategoryById(Integer.parseInt(cate.getParentID()));
				if (parentCate != null) {
					cateRespon.setParentCateName(parentCate.getCateName());
					cateRespon.setParentCateId(parentCate.getId());
				}
			}

			return cateRespon;
		}

		return null;
	}

	@Override
	public CategoryResponse checkDuplicate(String cateName) {
		Category cate = cateRepo.getCateByCastName(cateName);
		
		return convertToCategoryResponse(cate);
	}
}
