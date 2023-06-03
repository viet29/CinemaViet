package group.java.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
	@Query(name = "SELECT c FROM Category c WHERE c.id = :id")
	Category getCategoryById(@Param("id") int cateId);
	
	@Query("SELECT c FROM Category c WHERE c.CateName = :cateName")
	Category getCateByCastName(@Param("cateName") String cateName);
}	
