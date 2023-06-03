package group.java.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
	@Query(name = "SELECT r FROM Room r WHERE r.Id = :Id")
	Room getRoomById(@Param("Id") int roomId);
}
