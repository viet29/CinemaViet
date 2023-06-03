package group.java.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
	@Query(name = "SELECT m FROM Movie m WHERE m.id = :id")
	Movie getMovieById(@Param("id") int movie);
}
