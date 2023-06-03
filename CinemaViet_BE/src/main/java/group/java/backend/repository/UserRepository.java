package group.java.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	@Query(name = "SELECT u FROM User u WHERE u.username = :username")
	User findByUsername(@Param("username")String username);
}
