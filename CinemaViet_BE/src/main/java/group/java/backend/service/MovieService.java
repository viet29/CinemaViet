package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Movie;
import group.java.backend.model.response.MovieResponse;

@Service
public interface MovieService {
	List<MovieResponse> getListMovie();
	Movie saveMovie(Movie movie);
	MovieResponse getMovieById(int movieId);
	void deleteMovie(Movie movie);
	void addMovieCate(Movie movie , List<Integer> categories);
	void addMovieCast(Movie movie , List<Integer> casts);
	Movie getMovie(int id);
}
