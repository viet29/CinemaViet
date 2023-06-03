package group.java.backend.controller;

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

import group.java.backend.model.entity.Seat;
import group.java.backend.model.request.SeatRequest;
import group.java.backend.model.response.SeatResponse;
import group.java.backend.service.SeatService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class SeatController {
	@Autowired
	private SeatService seatService;

	@GetMapping("/admin/seats")
	public ResponseEntity<?> getListSeat() {
		List<SeatResponse> seatResponseList = seatService.getListSeat();
		if (seatResponseList != null && seatResponseList.size() > 0) {
			return ResponseEntity.ok().body(seatResponseList);
		} else {
			return ResponseEntity.badRequest().body("Null");
		}
	}

	@GetMapping("/admin/seat/{id}")
	public ResponseEntity<?> getSeatById(@PathVariable("id") int id) {
		SeatResponse response = seatService.getSeatById(id);
		if (response != null) {
			return ResponseEntity.ok().body(response);
		} else {
			return ResponseEntity.badRequest().body("Null");
		}
	}

	@PostMapping("/admin/seat/save")
	public ResponseEntity<?> saveSeat(@RequestBody SeatRequest request) {
		Seat seat = new Seat();

		if (request.getId() > 0) {
			seat.setId(request.getId());
		}

		seat.setStand(request.getStand());
		seat.setIsVip(request.getIsVip());

		SeatResponse response = seatService.saveSeat(seat);
		if (response != null) {
			return ResponseEntity.ok().body(response);
		} else {
			return ResponseEntity.badRequest().body("Create Fail");
		}
	}
	
	@GetMapping("/admin/seat/delete/{id}")
	public ResponseEntity<?> deleteSeatById(@PathVariable("id") int id) {
		try {
			Seat seat = seatService.getSeat(id);
			seatService.deleteSeat(seat);
			return ResponseEntity.ok().body("Delete Successfully");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.badRequest().body("Delete Fail");
		}
		
	}

}
