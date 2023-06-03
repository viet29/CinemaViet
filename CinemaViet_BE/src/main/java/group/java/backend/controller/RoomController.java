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

import group.java.backend.model.entity.Room;
import group.java.backend.model.request.RoomRequest;
import group.java.backend.model.response.RoomResponse;
import group.java.backend.service.RoomService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class RoomController {
	
	@Autowired
	private RoomService roomService;

	@GetMapping("/staff/room")
	public ResponseEntity<?> getListRoom() {
		List<RoomResponse> roomResponseList = roomService.getListRoom();

		if (roomResponseList != null && roomResponseList.size() > 0) {
			return ResponseEntity.ok().body(roomResponseList);
		} else {
			return ResponseEntity.badRequest().body("View list failed!");
		}
	}

	@PostMapping("/admin/room/save")
	public ResponseEntity<?> saveRoom(@RequestBody RoomRequest request) {
		Room room = new Room();

		if (request.getRoomId() > 0) {
			room.setId(request.getRoomId());
		}

		room.setRoomName(request.getRoomName());

		RoomResponse response = roomService.saveCastById(room);

		if (response != null) {
			return ResponseEntity.ok().body(response);
		} else {
			return ResponseEntity.badRequest().body("Save failed");
		}
	}

	@PostMapping("/admin/room/delete/{id}")
	public ResponseEntity<?> DeleteRoom(@PathVariable("id") Room roomId) {
		Boolean result = roomService.deleteRoom(roomId);

		if (result) {
			return ResponseEntity.ok().body("Delete Success");
		} else {
			return ResponseEntity.badRequest().body("Delete Fail");
		}
	}
	
	@GetMapping("/admin/room/{id}")
	public ResponseEntity<?> getRoomById(@PathVariable("id") int roomId) {
		RoomResponse result = roomService.getRoomById(roomId);

		if (result != null) {
			return ResponseEntity.ok().body(result);
		} else {
			return ResponseEntity.badRequest().body("Get details Fail");
		}
	}

}
