package group.java.backend.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Token;
import group.java.backend.repository.TokenReposiotry;
import group.java.backend.service.TokenService;

@Service
public class TokenServiceImpl implements TokenService {

	@Autowired
	private TokenReposiotry tokenRepo;

	@Override
	public Token saveToken(Token token) {
		tokenRepo.save(token);
		return null;
	}

	@Override
	public Token getToken(String tokenKey) {
		Optional<Token> checkToken = tokenRepo.getTokeByTokenKey(tokenKey);

		if (checkToken.isPresent()) {
			return checkToken.get();
		}
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteToken(Token token) {
		tokenRepo.delete(token);
	}

	@Override
	public void deleteTokenByUser(String userId) {
		List<Token> checkToken = tokenRepo.findAll().stream().filter(x -> x.getUserId().equals(userId)).collect(Collectors.toList());
		
		if (checkToken.size() > 0) {
			tokenRepo.deleteAll(checkToken);
		}
	}

}
