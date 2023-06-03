package group.java.backend.security.filter;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Token;
import group.java.backend.service.TokenService;

@Service
public class HttpLogoutHandler implements LogoutSuccessHandler {

	private final TokenService tokenService;

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException {

		String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {

			String token = authorizationHeader.substring("Bearer ".length());

			Token currentToken = tokenService.getToken(token);

			if(currentToken != null) {				
				tokenService.deleteToken(currentToken);
			}

			SecurityContextHolder.clearContext();

			response.setStatus(HttpServletResponse.SC_OK);
			response.getWriter().flush();
		}

	}

	public HttpLogoutHandler(TokenService tokenService) {
		super();
		this.tokenService = tokenService;
	}
}
