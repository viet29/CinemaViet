package group.java.backend.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;

import group.java.backend.security.filter.CustomAuthenticationFilter;
import group.java.backend.security.filter.CustomAuthorizationFilter;
import group.java.backend.security.filter.HttpLogoutHandler;
import group.java.backend.service.CustomUserDetailService;
import group.java.backend.service.TokenService;
import group.java.backend.service.UserService;

@Configuration
@EnableWebSecurity
public class ConfigSecurity extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomUserDetailService customUserDetailService;

	@Autowired
	private UserService userService;

	@Autowired
	private TokenService tokenService;

	@Autowired
	private LogoutHandler logoutHandler;

	private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(
				authenticationManagerBean(), userService, tokenService);
		// TODO Auto-generated method stub
		customAuthenticationFilter.setFilterProcessesUrl("/api/login");

		CorsConfiguration corsConfiguration = new CorsConfiguration();
		corsConfiguration.setAllowedHeaders(configAllowHeader());
		corsConfiguration.setAllowedOrigins(configAllowOrigins());
		corsConfiguration.setAllowedMethods(configAllowdMethods());
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setExposedHeaders(configExposedHeader());

		http.csrf().disable();
		http.authorizeHttpRequests().antMatchers("/upload/**","/api/register/**","/api/login/**", "/api/view/**").permitAll();
		http.authorizeHttpRequests().antMatchers("/api/super_admin/**").hasAnyAuthority("Role_Super_Admin");
		http.authorizeHttpRequests().antMatchers("/api/admin/**").hasAnyAuthority("Role_Admin", "Role_Super_Admin");
		http.authorizeHttpRequests().antMatchers("/api/staff/**").hasAnyAuthority("Role_Admin", "Role_Super_Admin" , "Role_staff");
		http.authorizeHttpRequests().antMatchers("/api/client/**" , "/api/user/**").hasAnyAuthority("Role_Client", "Role_Admin",
				"Role_Super_Admin" , "Role_staff");
		http.authorizeHttpRequests().anyRequest().authenticated().and().exceptionHandling().and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().cors()
				.configurationSource(request -> corsConfiguration);
		http.addFilter(customAuthenticationFilter);
		http.addFilterAfter(new CustomAuthorizationFilter(tokenService), UsernamePasswordAuthenticationFilter.class);
		http.logout().logoutUrl("/api/logout").addLogoutHandler(logoutHandler)
				.logoutSuccessHandler(new HttpLogoutHandler(tokenService));
	}
	
	
	public List<String> configAllowHeader(){
		List<String> configHeader = new ArrayList<String>();
		configHeader.add("Authorization");
		configHeader.add("Cache-Control");
		configHeader.add("Content-Type");
		
		return configHeader;
	}
	
	public List<String> configExposedHeader(){
		List<String> configExposed = new ArrayList<String>();
		configExposed.add("Authorization");
		
		return configExposed;
	}
	
	
	public List<String> configAllowOrigins(){
		List<String> configOrigin = new ArrayList<String>();
		configOrigin.add("http://localhost:3000");
		configOrigin.add("http://localhost:5173/");
		
		return configOrigin;
	}
	
	public List<String> configAllowdMethods(){
		List<String> configMethod = new ArrayList<String>();
		configMethod.add("GET");
		configMethod.add("POST");
		configMethod.add("PUT");
		configMethod.add("DELETE");
		configMethod.add("OPTIONS");
		configMethod.add("PATCH");
		
		return configMethod;
	}
	
	

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		// TODO Auto-generated method stub
		return super.authenticationManagerBean();
	}
}
