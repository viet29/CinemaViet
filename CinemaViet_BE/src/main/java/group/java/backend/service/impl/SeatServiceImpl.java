package group.java.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Seat;
import group.java.backend.model.response.SeatResponse;
import group.java.backend.repository.SeatRepository;
import group.java.backend.service.SeatService;

@Service
public class SeatServiceImpl implements SeatService {

	@Autowired
	private SeatRepository seatRepo;

	@Override
	public List<SeatResponse> getListSeat() {
		List<Seat> seats = seatRepo.findAll(Sort.by(Sort.Direction.DESC , "id"));
		List<SeatResponse> lstRespon = new ArrayList<SeatResponse>();

		if (seats != null && seats.size() > 0) {
			for (Seat s : seats) {
				SeatResponse respon = convertToResponse(s);

				if (respon != null) {
					lstRespon.add(respon);
				}
			}
		}
		// TODO Auto-generated method stub
		return lstRespon;
	}

	@Override
	public SeatResponse getSeatById(int id) {
		Seat seat = seatRepo.getSeatById(id);
		return convertToResponse(seat);
	}

	@Override
	public SeatResponse saveSeat(Seat seat) {
		Seat newSeat = seatRepo.save(seat);
		return convertToResponse(newSeat);
	}

	@Override
	public void deleteSeat(Seat seat) {
		seatRepo.delete(seat);
		// TODO Auto-generated method stub

	}

	@Override
	public Seat getSeat(int id) {
		Seat seat = seatRepo.getSeatById(id);
		return seat;
	}

	public SeatResponse convertToResponse(Seat seat) {
		if (seat != null) {
			SeatResponse respon = new SeatResponse();
			respon.setId(seat.getId());
			respon.setStand(seat.getStand());
			respon.setIsVip(seat.getIsVip());

			return respon;
		}

		return null;
	}

}
