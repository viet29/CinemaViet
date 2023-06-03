package group.java.backend.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.MovieCast;

@Repository
public interface MovieCastRepository extends JpaRepository<MovieCast, Integer>{
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM MovieCast s WHERE s.movie.id = :movieid")
	public void deleteMovieCastByMovieId(@Param("movieid") int movieid);
	
	@Query(value = "SELECT s FROM MovieCast s WHERE s.movie.id = :movieid")
	List<MovieCast> getMovieCastByMovieId(@Param("movieid") int movieid);
	
}
