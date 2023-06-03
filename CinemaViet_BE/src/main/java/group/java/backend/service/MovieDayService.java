package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.MovieDay;
import group.java.backend.model.request.MovieDayRequest;
import group.java.backend.model.response.MovieDayDisplayClientResponse;
import group.java.backend.model.response.MovieDayResponse;

@Service
public interface MovieDayService {
	List<MovieDayResponse> getListMovieDay();
	MovieDayResponse saveMovieDay(MovieDay movieDay);
	MovieDayResponse getMovieDayById(int id);
	MovieDay getMovieDay(int id);
	void delete(int id);
	List<MovieDayDisplayClientResponse> getCalendarMovie(int movieId);
	MovieDayResponse getCalendarMovieByMoviedDayId(int movieId);
	Boolean getCalendarMovieByMoviedDayId(MovieDayRequest request );
}
