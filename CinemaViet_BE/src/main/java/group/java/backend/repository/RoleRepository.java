package group.java.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
	@Query(name = "SELECT r FROM Role r WHERE r.roleName = :roleName")
	Role findByRoleName(@Param("roleName")String roleName);
}
