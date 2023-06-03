package group.java.backend.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.MovieCategory;

@Repository
public interface MovieCatetgoryRepository extends JpaRepository<MovieCategory, Integer>  {
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM MovieCategory s WHERE s.movie.id = :movieid")
	public void deleteMovieCateByMovieId(@Param("movieid") int movieid);
	
	@Query(value = "SELECT s FROM MovieCategory s WHERE s.movie.id = :movieid")
	List<MovieCategory> getMovieCateByMovieId(@Param("movieid") int movieid);
	
}
