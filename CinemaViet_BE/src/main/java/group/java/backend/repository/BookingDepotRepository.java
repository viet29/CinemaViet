package group.java.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.BookingDepot;

@Repository
public interface BookingDepotRepository extends JpaRepository<BookingDepot, Integer> {

	@Query(name = "SELECT bd FROM BookingDepot bd WHERE  bd.movieDayId = :mdId ")
	List<BookingDepot> getListBookingByMovieDayId(@Param("mdId") int movieDayId);

	@Query(name = "SELECT bd FROM BookingDepot bd WHERE bd.id = :id ")
	BookingDepot getBookingDepotById(@Param("id") int id);
	
	@Query(name = "SELECT bd FROM BookingDepot bd WHERE bd.userId = :userId ")
	List<BookingDepot> getBookingDepotByUserId(@Param("userId") String userId);
}
