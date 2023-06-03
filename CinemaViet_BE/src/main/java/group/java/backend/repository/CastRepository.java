package group.java.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.Cast;

@Repository
public interface CastRepository extends JpaRepository<Cast, Integer> {
	@Query(name = "SELECT e FROM Cast e WHERE e.id = :id")
	Cast getCastById(@Param("id") int castId);
	
	@Query(name = "SELECT e FROM Cast e WHERE e.castName = :castName")
	Cast getCastByCastName(@Param("castName") String castName);
}
