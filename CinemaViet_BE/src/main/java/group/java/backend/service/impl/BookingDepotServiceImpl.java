package group.java.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.BookingDepot;
import group.java.backend.model.entity.Movie;
import group.java.backend.model.entity.MovieDay;
import group.java.backend.model.entity.Room;
import group.java.backend.model.response.BookingDepotResponse;
import group.java.backend.model.response.BookingDepotSeatResponse;
import group.java.backend.repository.BookingDepotRepository;
import group.java.backend.repository.MovieDayRepository;
import group.java.backend.repository.MovieRepository;
import group.java.backend.repository.RoomRepository;
import group.java.backend.service.BookingDepotService;

@Service
public class BookingDepotServiceImpl implements BookingDepotService {

	@Autowired
	private BookingDepotRepository bookingRepo;

	@Autowired
	private MovieDayRepository movieDayRepo;

	@Autowired
	private RoomRepository roomRepo;

	@Autowired
	private MovieRepository movieRepo;

	@Override
	public List<BookingDepotSeatResponse> getSeatExistByMovieDay(int moviedDayId) {
		List<BookingDepot> lstBooking = bookingRepo.getListBookingByMovieDayId(moviedDayId);
		List<BookingDepotSeatResponse> lstRespon = new ArrayList<BookingDepotSeatResponse>();

		if (lstBooking != null && lstBooking.size() > 0) {
			for (BookingDepot bd : lstBooking) {
				BookingDepotSeatResponse respon = new BookingDepotSeatResponse();

				respon.setSeatName(bd.getSeatName());

				lstRespon.add(respon);
			}
		}
		// TODO Auto-generated method stub
		return lstRespon;
	}

	@Override
	public List<BookingDepotResponse> getBookingByUserId(String userId) {
		List<BookingDepot> lstBooking = bookingRepo.getBookingDepotByUserId(userId);
		List<Movie> lstMovie = movieRepo.findAll();
		List<Room> lstRoom = roomRepo.findAll();
		List<MovieDay> lstMovieDay = movieDayRepo.findAll();

		List<BookingDepotResponse> lstRepon = new ArrayList<BookingDepotResponse>();

		if (lstBooking != null && lstMovie != null && lstRoom != null && lstMovieDay != null) {
			for (BookingDepot booking : lstBooking) {
				BookingDepotResponse respon = new BookingDepotResponse();

				MovieDay md = lstMovieDay.stream().filter(x -> x.getId() == booking.getMovieDayId()).findFirst().get();
				Room room = lstRoom.stream().filter(x -> x.getId() == booking.getRoomId()).findFirst().get();
				Movie movie = lstMovie.stream().filter(x -> x.getId() == booking.getMovieId()).findFirst().get();

				respon.setShowDate(md.getShowDate().toString().split(" ", 2)[0]);
				respon.setShowTime(md.getShowTime());
				respon.setMovieDayId(booking.getMovieDayId());
				respon.setMovieId(booking.getMovieId());
				respon.setMovieName(movie.getTitile());
				respon.setBookingId(booking.getId());
				respon.setUserFullName(booking.getUser().getFullName());
				respon.setUserId(booking.getUser().getUserId());
				respon.setEmail(booking.getUser().getEmail());
				respon.setSeatName(booking.getSeatName());
				respon.setOrderDate(booking.getOrderDate().toString().split(" ", 2)[0]);
				respon.setStatus(booking.getStatus());
				respon.setRoomId(room.getId());
				respon.setRoomName(room.getRoomName());

				lstRepon.add(respon);

			}
		}

		// TODO Auto-generated method stub
		return lstRepon;
	}

	@Override
	public Boolean saveAllBookingDeport(List<BookingDepot> bookingDepots) {
		try {
			bookingRepo.saveAll(bookingDepots);
			return true;
		} catch (Exception e) {
			// TODO: handle exception
			return false;
		}
		// TODO Auto-generated method stub
	}

	@Override
	public List<BookingDepotResponse> getAllListBooking() {
		List<BookingDepot> lstBooking = bookingRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<Movie> lstMovie = movieRepo.findAll();
		List<Room> lstRoom = roomRepo.findAll();
		List<MovieDay> lstMovieDay = movieDayRepo.findAll();

		List<BookingDepotResponse> lstRepon = new ArrayList<BookingDepotResponse>();

		if (lstBooking != null && lstMovie != null && lstRoom != null && lstMovieDay != null) {
			for (BookingDepot booking : lstBooking) {
				BookingDepotResponse respon = new BookingDepotResponse();

				MovieDay md = lstMovieDay.stream().filter(x -> x.getId() == booking.getMovieDayId()).findFirst().get();
				Room room = lstRoom.stream().filter(x -> x.getId() == booking.getRoomId()).findFirst().get();
				Movie movie = lstMovie.stream().filter(x -> x.getId() == booking.getMovieId()).findFirst().get();

				respon.setShowDate(md.getShowDate().toString().split(" ", 2)[0]);
				respon.setShowTime(md.getShowTime());
				respon.setMovieDayId(booking.getMovieDayId());
				respon.setMovieId(booking.getMovieId());
				respon.setMovieName(movie.getTitile());
				respon.setBookingId(booking.getId());
				respon.setUserFullName(booking.getUser().getFullName());
				respon.setUserId(booking.getUser().getUserId());
				respon.setEmail(booking.getUser().getEmail());
				respon.setSeatName(booking.getSeatName());
				respon.setOrderDate(booking.getOrderDate().toString().split(" ", 2)[0]);
				respon.setStatus(booking.getStatus());
				respon.setRoomId(room.getId());
				respon.setRoomName(room.getRoomName());

				lstRepon.add(respon);

			}
		}

		// TODO Auto-generated method stub
		return lstRepon;
	}

	@Override
	public BookingDepot getBookingDeportById(int id) {
		BookingDepot bd = bookingRepo.getBookingDepotById(id);

		if (bd != null) {
			return bd;

		}
		return null;
	}

	@Override
	public BookingDepot saveBooking(BookingDepot bookingDepot) {
		BookingDepot b = bookingRepo.save(bookingDepot);
		return b;
	}
}
