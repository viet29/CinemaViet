package group.java.backend.controller;

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

import group.java.backend.model.entity.BookingDepot;
import group.java.backend.model.entity.User;
import group.java.backend.model.request.BookingDepotRequest;
import group.java.backend.service.BookingDepotService;
import group.java.backend.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class BookingDepotController {

	@Autowired
	private BookingDepotService bookingService;

	@Autowired
	private UserService userService;

	@PostMapping("/user/save/booking")
	public ResponseEntity<?> saveAllBookingDepot(@RequestBody BookingDepotRequest request) {
		try {

			if (request != null) {
				List<BookingDepot> lstBooking = new ArrayList<BookingDepot>();
				List<String> lstSeat = request.getLstSeat();

				if (lstSeat != null && lstSeat.size() > 0) {
					for (String seat : lstSeat) {
						BookingDepot entity = new BookingDepot();
						User user = userService.getCreateByUser(request.getUserId());

						entity.setDiscount(request.getDiscount());
						entity.setMovieDayId(request.getMovieDayId());
						entity.setMovieId(request.getMovieId());
						entity.setSeatId(1);
						entity.setOrderDate(new Date());
						entity.setRoomId(request.getRoomId());
						entity.setStatus(request.getStatus());
						entity.setUser(user);
						entity.setSeatName(seat);

						lstBooking.add(entity);
					}
					bookingService.saveAllBookingDeport(lstBooking);
				}

			}

			return ResponseEntity.ok().body("Save Done");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body(e.getMessage());

		}
	}

	@GetMapping("/view/booking/seated/{id}")
	public ResponseEntity<?> getAllSeatedBooking(@PathVariable("id") int movieDayId) {

		return ResponseEntity.ok().body(bookingService.getSeatExistByMovieDay(movieDayId));
	}

	@GetMapping("/staff/booking_depot")
	public ResponseEntity<?> getAllSeatedBookingInAdmin() {

		return ResponseEntity.ok().body(bookingService.getAllListBooking());
	}

	@GetMapping("/user/booking_depot/{userId}")
	public ResponseEntity<?> getAllSeatedBookingInClient(@PathVariable("userId") String userId) {

		return ResponseEntity.ok().body(bookingService.getBookingByUserId(userId));
	}

	@GetMapping("/staff/booking/approve/{id}")
	public ResponseEntity<?> approveMoviesTicket(@PathVariable("id") int bookingId) {
		BookingDepot b = bookingService.getBookingDeportById(bookingId);

		if (b != null) {
			b.setStatus(2);
			bookingService.saveBooking(b);
		}

		return ResponseEntity.ok().body("Approve Success");
	}
}
