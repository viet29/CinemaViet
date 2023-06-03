package group.java.backend.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Movie;
import group.java.backend.model.entity.MovieDay;
import group.java.backend.model.entity.Room;
import group.java.backend.model.request.MovieDayRequest;
import group.java.backend.model.response.MovieDayDisplayClientResponse;
import group.java.backend.model.response.MovieDayResponse;
import group.java.backend.model.response.MovieResponse;
import group.java.backend.model.response.SubDay;
import group.java.backend.model.response.SubMovieDay;
import group.java.backend.repository.MovieDayRepository;
import group.java.backend.repository.MovieRepository;
import group.java.backend.repository.RoomRepository;
import group.java.backend.service.MovieDayService;

@Service
public class MovieDayServiceImpl implements MovieDayService {

	@Autowired
	private MovieDayRepository movieDayRepo;

	@Autowired
	private MovieRepository movieRepo;

	@Autowired
	private RoomRepository roomRepo;

	@Override
	public List<MovieDayResponse> getListMovieDay() {
		List<MovieDay> lst = movieDayRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<MovieDayResponse> lstRespon = new ArrayList<MovieDayResponse>();
		if (lst != null && lst.size() > 0) {
			for (MovieDay md : lst) {
				MovieDayResponse respon = convertToResponse(md);

				if (respon != null) {
					lstRespon.add(respon);
				}
			}
		}
		// TODO Auto-generated method stub
		return lstRespon;
	}

	@Override
	public MovieDayResponse saveMovieDay(MovieDay movieDay) {
		MovieDay newMovieDay = movieDayRepo.save(movieDay);
		// TODO Auto-generated method stub
		return convertToResponse(newMovieDay);
	}

	@Override
	public MovieDayResponse getMovieDayById(int id) {
		MovieDay movieDay = movieDayRepo.getMovieDayById(id);
		// TODO Auto-generated method stub
		return convertToResponse(movieDay);
	}

	@Override
	public MovieDay getMovieDay(int id) {
		MovieDay movieDay = movieDayRepo.getMovieDayById(id);
		// TODO Auto-generated method stub
		return movieDay;
	}

	@Override
	public void delete(int id) {
		try {
			MovieDay movieDay = movieDayRepo.getMovieDayById(id);
			if (movieDay != null) {
				movieDayRepo.delete(movieDay);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		// TODO Auto-generated method stub

	}

	@Override
	public List<MovieDayDisplayClientResponse> getCalendarMovie(int movieId) {
		String pattern = "yyyy-MM-dd";
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
		SimpleDateFormat sp1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String toDate = simpleDateFormat.format(new Date());

		String dateNowString = toDate + " 00:00:00";

		Date dateFilter = new Date();
		try {
			dateFilter = sp1.parse(dateNowString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		List<MovieDay> lstMovieDay = movieDayRepo.getListMovieDayByMovieId(movieId, dateFilter,
				Sort.by(Sort.Direction.ASC, "roomId"));
		List<MovieDayDisplayClientResponse> lstRespon = new ArrayList<MovieDayDisplayClientResponse>();

		if (lstMovieDay != null && lstMovieDay.size() > 0) {
			Movie movie = movieRepo.getMovieById(movieId);

			int currentRoom = Integer.MIN_VALUE;
			for (MovieDay md : lstMovieDay) {

//				String fromDate = md.getShowDate().toString().split(" ", 2)[0];
				Date dateNow = new Date();
				MovieDayDisplayClientResponse respon = new MovieDayDisplayClientResponse();
				Room room = roomRepo.getRoomById(md.getRoomId());

				if (currentRoom != md.getRoomId()) {
					currentRoom = md.getRoomId();
					int roomExistCalendar = currentRoom;

					List<String> lstShowDate = new ArrayList<String>();
					String currentDate = "";

					lstMovieDay.stream().forEach(x -> {
						if (x.getRoomId() == roomExistCalendar) {
							lstShowDate.add(x.getShowDate().toString().split(" ", 2)[0]);
						}
					});

					List<SubMovieDay> lstSub = new ArrayList<SubMovieDay>();

					if (lstShowDate != null && lstShowDate.size() > 0) {

						List<String> checkDulicate = lstShowDate.stream().distinct()
								.collect(java.util.stream.Collectors.toList());

						for (String date : checkDulicate) {
							if (!currentDate.equals(date)) {
								List<SubDay> lstShowTime = new ArrayList<SubDay>();

								SubMovieDay sub = new SubMovieDay();
								currentDate = date;
								lstMovieDay.stream().forEach(x -> {
									String[] time = x.getShowTime().split(":", 2);
									String dateString = x.getShowDate().toString().split(" ", 2)[0] + " " + time[0]
											+ ":" + time[1] + ":00";

									Date d = new Date();
									try {
										d = sp1.parse(dateString);
									} catch (ParseException e) {
										e.printStackTrace();
									}

									long diffDate = d.getTime() - (new Date().getTime());

									if (date.equals(x.getShowDate().toString().split(" ", 2)[0])
											&& x.getRoomId() == md.getRoomId() && x.getShowDate().compareTo(dateNow) > 0
											|| (date.equals(x.getShowDate().toString().split(" ", 2)[0])
													&& x.getRoomId() == md.getRoomId()
													&& (diffDate > 0 && x.getShowDate().toString().split(" ", 2)[0]
															.equals(toDate)))) {
										// saveRespon
										respon.setRoomId(room.getId());
										respon.setRoomName(room.getRoomName());
										respon.setMovieDayId(md.getId());
										respon.setMovieName(movie.getTitile());
										//
										sub.setShowDate(date);
										SubDay subDay = new SubDay();
										subDay.setMovieDayId(x.getId());
										subDay.setShowTime(x.getShowTime());
										lstShowTime.add(subDay);
									}
								});

								if (lstShowTime != null && lstShowTime.size() > 0) {
									Collections.sort(lstShowTime, (d1, d2) -> {
										return d1.getShowTime().compareTo(d2.getShowTime());
									});

									sub.setLstShowTime(lstShowTime);
								}
								lstSub.add(sub);
							}
						}

						respon.setLstSubMovied(lstSub);
						lstRespon.add(respon);

					}

				}
			}
		}
		// TODO Auto-generated method stub
		return lstRespon;
	}

	@Override
	public MovieDayResponse getCalendarMovieByMoviedDayId(int movieId) {
		MovieDay md = movieDayRepo.getMovieDayById(movieId);

		// TODO Auto-generated method stub
		return convertToResponse(md);
	}

	@Override
	public Boolean getCalendarMovieByMoviedDayId(MovieDayRequest request) {
		SimpleDateFormat sp1 = new SimpleDateFormat("yyyy-MM-dd");
		Date d = new Date();
		try {
			d = sp1.parse(request.getShowDate());
		} catch (ParseException e) {
			e.printStackTrace();
		}

		if (request != null) {
			MovieDay result = movieDayRepo.getCalendarMovie(request.getMovieId(), d, request.getRoomId(),
					request.getShowTime());
			if (result != null) {
				return true;
			}
		}
		// TODO Auto-generated method stub
		return false;
	}

	public MovieDayResponse convertToResponse(MovieDay movieDay) {
		if (movieDay != null) {
			MovieDayResponse respon = new MovieDayResponse();
			Movie movie = movieRepo.getMovieById(movieDay.getMovieId());
			Room room = roomRepo.getRoomById(movieDay.getRoomId());
			MovieResponse movieRes = new MovieResponse();

			respon.setId(movieDay.getId());
			respon.setShowDate(movieDay.getShowDate().toString().split(" ", 2)[0]);
			respon.setShowTime(movieDay.getShowTime());
			respon.setRoomId(room.getId());
			respon.setRoomName(room.getRoomName());

			movieRes.setId(movie.getId());
			movieRes.setTitile(movie.getTitile());
			movieRes.setDescription(movie.getDescription());

			respon.setMovieRes(movieRes);

			return respon;
		}

		return null;
	}

}
