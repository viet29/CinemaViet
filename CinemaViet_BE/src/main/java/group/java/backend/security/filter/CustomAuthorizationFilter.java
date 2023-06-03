package group.java.backend.security.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.fasterxml.jackson.databind.ObjectMapper;

import group.java.backend.model.entity.Token;
import group.java.backend.service.TokenService;

public class CustomAuthorizationFilter extends OncePerRequestFilter {
	private final TokenService tokenService;

	public CustomAuthorizationFilter(TokenService tokenService) {
		super();
		this.tokenService = tokenService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if (request.getServletPath().equals("/api/login")) {
			filterChain.doFilter(request, response);
		} else {
			String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
			if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
				String token = authorizationHeader.substring("Bearer ".length());
				try {
					Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
					JWTVerifier jwtVerifier = JWT.require(algorithm).build();
					DecodedJWT decodedJWT = jwtVerifier.verify(token);
					String username = decodedJWT.getSubject();
					List<String> roles = Arrays.asList(decodedJWT.getClaim("roles").asArray(String.class));
					Collection<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
					roles.stream().forEach(role -> {
						authorities.add(new SimpleGrantedAuthority(role));
					});

					Token tokenAccess = tokenService.getToken(token);

					if (tokenAccess != null && tokenAccess.getIsAccess()) {
						UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
								username, null, authorities);

						SecurityContextHolder.getContext().setAuthentication(authenticationToken);
					}

					filterChain.doFilter(request, response);
				} catch (Exception e) {
					// TODO: handle exception
					System.out.println(e.getMessage());
					response.setHeader("errors", e.getMessage());
					response.setStatus(HttpStatus.FORBIDDEN.value());
					Map<String, String> errors = new HashMap<>();

					errors.put("error_message", e.getMessage());

					response.setContentType(MediaType.APPLICATION_JSON_VALUE);
					new ObjectMapper().writer().writeValue(response.getOutputStream(), errors);
				}
			} else {
//				throw new RuntimeException("Refresh runtime is missing");
				filterChain.doFilter(request, response);
			}
		}
		// TODO Auto-generated method stub

	}
}
