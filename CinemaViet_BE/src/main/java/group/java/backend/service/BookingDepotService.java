package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.BookingDepot;
import group.java.backend.model.response.BookingDepotResponse;
import group.java.backend.model.response.BookingDepotSeatResponse;

@Service
public interface BookingDepotService {
	List<BookingDepotSeatResponse> getSeatExistByMovieDay(int moviedDay);
	
	Boolean saveAllBookingDeport(List<BookingDepot> bookingDepots);
	
	List<BookingDepotResponse> getAllListBooking();
	
	BookingDepot getBookingDeportById(int id);
	
	BookingDepot saveBooking(BookingDepot bookingDepot);
	
	List<BookingDepotResponse> getBookingByUserId(String userId);
}
