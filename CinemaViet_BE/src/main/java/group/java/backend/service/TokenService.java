package group.java.backend.service;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Token;

@Service
public interface TokenService {
	Token saveToken(Token token);

	Token getToken(String tokenKey);

	void deleteToken(Token token);

	void deleteTokenByUser(String userId);
}
