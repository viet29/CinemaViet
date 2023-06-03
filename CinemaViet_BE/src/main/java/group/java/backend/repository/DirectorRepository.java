package group.java.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.Director;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Integer>{
	@Query(name = "SELECT d FROM Director d WHERE d.id = :id")
	Director getDirectorById(@Param("id") int directorId);
	
	@Query("SELECT d FROM Director d WHERE d.directorName = :dirName")
	Director getDirByDirName(@Param("dirName") String dirName);
}
