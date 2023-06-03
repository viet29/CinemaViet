package group.java.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
	@Query(name = "SELECT s FROM Seat s WHERE s.id = :id")
	Seat getSeatById(@Param("id") int seatId);
}
