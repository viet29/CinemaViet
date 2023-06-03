package group.java.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import group.java.backend.model.entity.Token;

@Repository
public interface TokenReposiotry  extends JpaRepository<Token, Integer>{
	
	@Query(name = "SELECT t FROM Token t WHERE t.tokenKey = :tokenKey")
	Optional<Token> getTokeByTokenKey(@Param("tokenKey") String tokenKey);
}
