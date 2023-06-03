package group.java.backend.controller;

import java.time.LocalDate;
import java.time.ZoneId;
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

import group.java.backend.model.entity.MovieDay;
import group.java.backend.model.request.MovieDayRequest;
import group.java.backend.model.response.MovieDayResponse;
import group.java.backend.service.MovieDayService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class MovieDayController {

	@Autowired
	private MovieDayService movieDayService;

	@GetMapping("/staff/movieDays")
	public ResponseEntity<?> getListMovieDay() {
		List<MovieDayResponse> lst = movieDayService.getListMovieDay();

		return ResponseEntity.ok().body(lst);

	}

	@GetMapping("/admin/movieDay/{id}")
	public ResponseEntity<?> getMovieDay(@PathVariable("id") int id) {
		MovieDayResponse mdr = movieDayService.getMovieDayById(id);

		return ResponseEntity.ok().body(mdr);

	}

	@PostMapping("/admin/movieDay/save")
	public ResponseEntity<?> saveMovieDay(@RequestBody MovieDayRequest request) {
		MovieDay movieDay = new MovieDay();

		if (request.getId() > 0) {
			movieDay.setId(request.getId());
		}

		movieDay.setMovieId(request.getMovieId());
		movieDay.setShowTime(request.getShowTime());
		Date showDate = Date
				.from(LocalDate.parse(request.getShowDate()).atStartOfDay(ZoneId.systemDefault()).toInstant());
		movieDay.setShowDate(showDate);
		movieDay.setRoomId(request.getRoomId());

		MovieDayResponse result = movieDayService.saveMovieDay(movieDay);

		if (result != null) {
			return ResponseEntity.ok().body(result);
		} else {
			return ResponseEntity.badRequest().body("Save Fail");
		}

	}

	@PostMapping("/admin/movieDay/checkDuplicate")
	public ResponseEntity<?> CheckDuplicateCalendarMovieDay(@RequestBody MovieDayRequest request) {

		Boolean result = movieDayService.getCalendarMovieByMoviedDayId(request);

		if (result) {
			return ResponseEntity.ok().body("Show time exist in show date");
		} else {
			return ResponseEntity.ok().body("");
		}
	}

	@GetMapping("/admin/movieDay/delete/{id}")
	public ResponseEntity<?> deleteData(@PathVariable("id") int id) {
		try {
			movieDayService.delete(id);
			return ResponseEntity.ok().body("Delete Successfully");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Delete Fail");
			// TODO: handle exception
		}

	}

	@GetMapping("/view/movie/show_calendar/{id}")
	public ResponseEntity<?> getMovieDayByMovieId(@PathVariable("id") int id) {

		return ResponseEntity.ok().body(movieDayService.getCalendarMovie(id));

	}

	@GetMapping("/view/movie_day/show_calendar/{id}")
	public ResponseEntity<?> getMovieDayByMovieDayId(@PathVariable("id") int id) {

		return ResponseEntity.ok().body(movieDayService.getCalendarMovieByMoviedDayId(id));

	}

}
