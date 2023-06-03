package group.java.backend.controller;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import group.java.backend.model.entity.Director;
import group.java.backend.model.entity.Movie;
import group.java.backend.model.entity.User;
import group.java.backend.model.request.MovieRequest;
import group.java.backend.model.request.SelectOptionRequest;
import group.java.backend.model.response.MovieResponse;
import group.java.backend.service.DirectorService;
import group.java.backend.service.MovieService;
import group.java.backend.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class MovieController {
	@Autowired
	private MovieService movieService;

	@Autowired
	private UserService userService;

	@Autowired
	private DirectorService directorService;

	@GetMapping("/staff/movies")
	public ResponseEntity<?> getListMovie() {
		List<MovieResponse> response = movieService.getListMovie();
		return ResponseEntity.ok().body(response);
	}
	
	@GetMapping("/view/movies")
	public ResponseEntity<?> getListMovieToView() {
		List<MovieResponse> response = movieService.getListMovie();
		return ResponseEntity.ok().body(response);
	}
	
	@GetMapping("/view/movie/{id}")
	public ResponseEntity<?> getMovieByIdToView(@PathVariable("id") int movieId) {
		MovieResponse response = movieService.getMovieById(movieId);
		return ResponseEntity.ok().body(response);
	}

	@GetMapping("/staff/movie/{id}")
	public ResponseEntity<?> getMovieById(@PathVariable("id") int movieId) {
		MovieResponse response = movieService.getMovieById(movieId);
		return ResponseEntity.ok().body(response);
	}

	@PostMapping("/admin/movie/save")
	public ResponseEntity<?> saveMovie(@RequestBody MovieRequest request) {
		Movie movie = new Movie();
		List<Integer> lstCate = new ArrayList<Integer>();
		List<Integer> lstCast = new ArrayList<Integer>();
		Director director = directorService.getDirector(request.getDirectorId());

		if (request.getId() > 0) {
			movie = movieService.getMovie(request.getId());
		}

		if (director != null) {
			movie.setDirector(director);
		}

		movie.setTitile(request.getTitile());

		if (request.getThumail() != null && !request.getThumail().isEmpty()) {

			movie.setThumail(request.getThumail());
		}

		movie.setDescription(request.getDescription());
		movie.setTrailer(request.getTrailer());
		movie.setStartNumber(request.getStartNumber());
		movie.setRated(request.getRated());
		movie.setRunningTime(request.getRunningTime());

		User user = userService.getCreateByUser(request.getCreateById());

		if (user != null) {
			movie.setCreateBy(user);
		}

		if (request.getReleaseDate() != null) {
			Date releaseDate = Date
					.from(LocalDate.parse(request.getReleaseDate()).atStartOfDay(ZoneId.systemDefault()).toInstant());
			movie.setReleaseDate(releaseDate);
		} else {
			movie.setReleaseDate(new Date());
		}

		Movie res = movieService.saveMovie(movie);

		for (SelectOptionRequest r : request.getMovieCate()) {
			lstCate.add(Integer.parseInt(r.getValue()));
		}

		for (SelectOptionRequest r : request.getCasts()) {
			lstCast.add(Integer.parseInt(r.getValue()));
		}

		if (res != null) {
			movieService.addMovieCate(res, lstCate);
			movieService.addMovieCast(res, lstCast);
		}

		return ResponseEntity.ok().body(res);
	}

	@PostMapping("/admin/movie/save/id")
	public ResponseEntity<?> saveMovieId(@RequestBody MovieRequest request) {

		List<Integer> lstCate = new ArrayList<Integer>();
		List<Integer> lstCast = new ArrayList<Integer>();

		Movie res = movieService.getMovie(1);

		for (SelectOptionRequest r : request.getMovieCate()) {
			lstCate.add(Integer.parseInt(r.getValue()));
		}

		for (SelectOptionRequest r : request.getCasts()) {
			lstCast.add(Integer.parseInt(r.getValue()));
		}

		if (res != null) {
			movieService.addMovieCate(res, lstCate);
			movieService.addMovieCast(res, lstCast);
		}

		return ResponseEntity.ok().body(res);
	}
}
