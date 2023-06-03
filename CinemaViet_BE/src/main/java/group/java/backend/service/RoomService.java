package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Room;
import group.java.backend.model.response.RoomResponse;

@Service
public interface RoomService {
	List<RoomResponse> getListRoom();
	RoomResponse getRoomById(int id);
	RoomResponse saveCastById(Room room);
	Boolean deleteRoom(Room room);
	

}
