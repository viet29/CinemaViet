package group.java.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Room;
import group.java.backend.model.response.RoomResponse;
import group.java.backend.repository.RoomRepository;
import group.java.backend.service.RoomService;

@Service
public class RoomServicelmpl implements RoomService {
	@Autowired
	private RoomRepository roomRepo;
	
	
	@Override
	public List<RoomResponse> getListRoom() {
		// TODO Auto-generated method stub
		List<Room> lstRoom = roomRepo.findAll(Sort.by(Sort.Direction.DESC , "id"));
		List<RoomResponse> lstRespon = new ArrayList<RoomResponse>();
		if(lstRoom != null && lstRoom .size()>0 ){
			for(Room ro :lstRoom) {
				RoomResponse respon = convertToRoom(ro);
				if(respon != null) {
					lstRespon.add(respon);
				}
			}
		}
		return lstRespon;
	}

	@Override
	public RoomResponse getRoomById(int id) {
		// TODO Auto-generated method stub
		Room room = roomRepo.getRoomById(id);
		return convertToRoom(room);
	}

	@Override
	public RoomResponse saveCastById(Room room) {
		// TODO Auto-generated method stub
		Room newRoom = roomRepo.save(room);
		return convertToRoom(newRoom);
	}

	@Override
	public Boolean deleteRoom(Room room) {
		
		try {
			roomRepo.delete(room);
			return true;
		} catch (Exception e) {
			return false;
		}
		// TODO Auto-generated method stub
	}
	
	public RoomResponse convertToRoom(Room entity) {
		if(entity != null) {
			RoomResponse roRespo = new RoomResponse();
			roRespo.setRoomId(entity.getId());
			roRespo.setRoomName(entity.getRoomName());;
			
			return roRespo;
			
		}
		
	return null;
	
}
}
