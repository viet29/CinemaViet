package group.java.backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.MovieDay;

@Repository
public interface MovieDayRepository extends JpaRepository<MovieDay, Integer> {
	@Query(name = "SELECT md FROM MovieDay md WHERE md.id = :id")
	MovieDay getMovieDayById(@Param("id") int movieDayId);

	@Query("SELECT m FROM MovieDay m WHERE m.movieId = :movieId AND m.showDate >= :dateString ")
	List<MovieDay> getListMovieDayByMovieId(@Param("movieId") int movie, @Param("dateString") Date dateFilter,
			Sort sort);

	@Query("SELECT m FROM MovieDay m "
			+ " WHERE m.movieId = :movieId "
			+ " AND m.showDate = :dateString "
			+ " AND m.showTime = :showTime " 
			+ " AND m.roomId = :roomId ")
	MovieDay getCalendarMovie(@Param("movieId") int movie, @Param("dateString") Date dateFilter,
			@Param("roomId") int roomId, @Param("showTime") String showTime);

}
