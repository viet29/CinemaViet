package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Seat;
import group.java.backend.model.response.SeatResponse;

@Service
public interface SeatService {
	List<SeatResponse> getListSeat();
	SeatResponse getSeatById(int id);
	SeatResponse saveSeat(Seat seat);
	void deleteSeat(Seat seat);
	Seat getSeat(int id);
}
