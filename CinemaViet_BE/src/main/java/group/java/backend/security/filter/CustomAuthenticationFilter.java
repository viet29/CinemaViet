package group.java.backend.security.filter;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import group.java.backend.model.entity.Token;
import group.java.backend.model.response.UserInfoResponse;
import group.java.backend.service.TokenService;
import group.java.backend.service.UserService;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;

	private final UserService userService;

	private final TokenService tokenService;

	public CustomAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService,
			TokenService tokenService) {
		this.authenticationManager = authenticationManager;
		this.userService = userService;
		this.tokenService = tokenService;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		// TODO Auto-generated method stub
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		
		group.java.backend.model.entity.User currentToken = userService.getUser(username);
		
		if(currentToken != null) {
//			tokenService.deleteTokenByUser(currentToken.getUserId());
		}

		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);

		return authenticationManager.authenticate(authenticationToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		User user = (User) authResult.getPrincipal();
		Token token = new Token();

		UserInfoResponse userInfo = userService.getUserInfoByUserName(user.getUsername());
		group.java.backend.model.entity.User currentUser = userService.getUser(userInfo.getUserName());

		Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());

		String access_token = JWT.create().withSubject(user.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
				.withIssuer(request.getRequestURL().toString())
				.withClaim("roles",
						user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.sign(algorithm);

		String refresh_token = JWT.create().withSubject(user.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
				.withIssuer(request.getRequestURL().toString()).sign(algorithm);

		token.setUserId(currentUser.getUserId());
		token.setTokenKey(access_token);
		token.setIsAccess(true);

		Map<String, Object> tokens = new HashMap<>();
		tokens.put("access_token", access_token);
		tokens.put("refresh_token", refresh_token);

		tokenService.saveToken(token);
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writer().writeValue(response.getOutputStream(), tokens);

	}

}
