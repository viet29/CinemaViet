package group.java.backend.service.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Cast;
import group.java.backend.model.entity.Category;
import group.java.backend.model.entity.Movie;
import group.java.backend.model.entity.MovieCast;
import group.java.backend.model.entity.MovieCategory;
import group.java.backend.model.response.CastResponse;
import group.java.backend.model.response.CategoryResponse;
import group.java.backend.model.response.MovieResponse;
import group.java.backend.repository.CastRepository;
import group.java.backend.repository.CategoryRepository;
import group.java.backend.repository.MovieCastRepository;
import group.java.backend.repository.MovieCatetgoryRepository;
import group.java.backend.repository.MovieRepository;
import group.java.backend.service.MovieService;

@Service
public class MovieServiceImpl implements MovieService {
	@Autowired
	private MovieRepository movieRepo;

	@Autowired
	private CategoryRepository cateRepo;

	@Autowired
	private CastRepository castRepo;

	@Autowired
	private MovieCatetgoryRepository movieCateRepo;

	@Autowired
	private MovieCastRepository movieCastRepo;

	@Override
	public List<MovieResponse> getListMovie() {
		List<Movie> lstMovie = movieRepo.findAll(Sort.by(Sort.Direction.DESC , "id"));
		List<MovieResponse> lstRespon = new ArrayList<MovieResponse>();

		if (lstMovie != null && lstMovie.size() > 0) {
			for (Movie movie : lstMovie) {
				MovieResponse respon = convertToResponse(movie);

				if (respon != null) {
					lstRespon.add(respon);
				}
			}
		}
		// TODO Auto-generated method stub
		return lstRespon;
	}

	@Override
	public Movie saveMovie(Movie movie) {
		Movie newMovie = movieRepo.save(movie);
		// TODO Auto-generated method stub
		return newMovie;
	}

	@Override
	public MovieResponse getMovieById(int movieId) {
		Movie movie = movieRepo.getMovieById(movieId);
		// TODO Auto-generated method stub
		return convertToResponse(movie);
	}

	@Override
	public void deleteMovie(Movie movie) {
		try {
			movieRepo.delete(movie);
		} catch (Exception e) {
			// TODO: handle exception
		}
		// TODO Auto-generated method stub
	}

	@Override
	public Movie getMovie(int id) {
		// TODO Auto-generated method stub
		return movieRepo.getMovieById(id);
	}

	@Override
	public void addMovieCate(Movie movie, List<Integer> categorys) {
		movieCateRepo.deleteMovieCateByMovieId(movie.getId());

		List<MovieCategory> lstMC = new ArrayList<MovieCategory>();
		for (Integer cateId : categorys) {
			MovieCategory mc = new MovieCategory();
			Category cate = cateRepo.getCategoryById(cateId);
			mc.setCategory(cate);
			mc.setMovie(movie);

			lstMC.add(mc);
		}

		if (lstMC != null) {
			movieCateRepo.saveAll(lstMC);
		}
	}

	@Override
	public void addMovieCast(Movie movie, List<Integer> casts) {
		movieCastRepo.deleteMovieCastByMovieId(movie.getId());
		;
		List<MovieCast> lstMC = new ArrayList<MovieCast>();
		for (Integer cateId : casts) {
			MovieCast mc = new MovieCast();
			Cast cast = castRepo.getCastById(cateId);
			mc.setCast(cast);
			mc.setMovie(movie);
			lstMC.add(mc);
		}

		if (lstMC != null) {
			movieCastRepo.saveAll(lstMC);
		}
	}

	public MovieResponse convertToResponse(Movie movie) {

		if (movie != null) {
			MovieResponse respon = new MovieResponse();

			respon.setId(movie.getId());
			respon.setDescription(movie.getDescription());
			respon.setTitile(movie.getTitile());
			respon.setThumail(movie.getThumail());
			respon.setTrailer(movie.getTrailer());
			respon.setStartNumber(movie.getStartNumber());
			respon.setRated(movie.getRated());
			respon.setRunningTime(movie.getRunningTime());
			respon.setReleaseDate(new SimpleDateFormat("YYYY-MM-dd").format(movie.getReleaseDate()));
			respon.setCreateById(movie.getCreateBy().getUserId());
			respon.setCreateByName(movie.getCreateBy().getFullName());
			respon.setCreateByEmail(movie.getCreateBy().getEmail());

			if (movie.getDirector() != null) {

				respon.setDirectorName(movie.getDirector().getDirectorName());
				respon.setDirectorId(movie.getDirector().getId());
				respon.setDirectorImage(movie.getDirector().getDirectorImage());
			}

			List<MovieCategory> lstCate = movieCateRepo.getMovieCateByMovieId(movie.getId());
			List<MovieCast> lstCast = movieCastRepo.getMovieCastByMovieId(movie.getId());
			List<CategoryResponse> lstCateRespon = new ArrayList<CategoryResponse>();
			List<CastResponse> lstCastRespon = new ArrayList<CastResponse>();

			if (lstCate != null && lstCate.size() > 0) {
				for (MovieCategory mCate : lstCate) {
					CategoryResponse cateRespon = convertToCategoryResponse(mCate.getCategory());

					if (cateRespon != null) {
						lstCateRespon.add(cateRespon);
					}
				}
				
				respon.setMovieCate(lstCateRespon);
			}

			if (lstCast != null && lstCast.size() > 0) {
				for (MovieCast mCast : lstCast) {
					CastResponse castRespon = convertToCast(mCast.getCast());

					if (castRespon != null) {
						lstCastRespon.add(castRespon);
					}
				}
				
				respon.setCasts(lstCastRespon);
			}

			return respon;

		}

		return null;
	}

	public CategoryResponse convertToCategoryResponse(Category cate) {

		if (cate != null) {
			CategoryResponse cateRespon = new CategoryResponse();

			cateRespon.setCategoryId(cate.getId());
			cateRespon.setCategoryName(cate.getCateName());
			cateRespon.setCreateByUserName(cate.getCreateBy().getFullName());
			cateRespon.setCreateByUserId(cate.getCreateBy().getUserId());
			cateRespon.setCreateByUserEmail(cate.getCreateBy().getEmail());
			cateRespon.setStatus(cate.getStatus());

			if (cate.getParentID() != null) {
				Category parentCate = cateRepo.getCategoryById(Integer.parseInt(cate.getParentID()));
				if (parentCate != null) {
					cateRespon.setParentCateName(parentCate.getCateName());
					cateRespon.setParentCateId(parentCate.getId());
				}
			}

			return cateRespon;
		}

		return null;
	}

	public CastResponse convertToCast(Cast entity) {
		if (entity != null) {
			CastResponse eRespon = new CastResponse();
			eRespon.setCastId(entity.getId());
			eRespon.setCastName(entity.getCastName());
			eRespon.setImage(entity.getImage());

			return eRespon;
		}
		return null;
	}

}
