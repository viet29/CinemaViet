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

import group.java.backend.model.entity.Director;
import group.java.backend.model.request.DirectorRequest;
import group.java.backend.model.response.DirectorResponse;
import group.java.backend.service.DirectorService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class DirectorController {
	@Autowired
	private DirectorService directorService;

	@GetMapping("/staff/directors")
	public ResponseEntity<?> getListDirector() {
		List<DirectorResponse> response = directorService.getListDirector();

		if (response != null && response.size() > 0) {
			return ResponseEntity.ok().body(response);
		} else {
			return ResponseEntity.badRequest().body("Deo get dc admin oi");
		}
	}

	@PostMapping("/admin/director/save")
	public ResponseEntity<?> saveDirector(@RequestBody DirectorRequest request) {
		Director dir = new Director();

		if (request.getDirectorId() > 0) {
			dir = directorService.getDirector(request.getDirectorId());
		}

		dir.setDirectorName(request.getDirectorName());

		if (request.getDirectorImage() != null && !request.getDirectorImage().isEmpty()) {
			dir.setDirectorImage(request.getDirectorImage());
		}

		DirectorResponse response = directorService.saveDirectorById(dir);

		if (response != null) {
			return ResponseEntity.ok().body(response);
		} else {
			return ResponseEntity.badRequest().body("Deo save dc admin oi");
		}
	}

	@PostMapping("/admin/dir/checkDuplicate")
	public ResponseEntity<?> checkExist(@RequestBody DirectorRequest request) {

		DirectorResponse response = directorService.checkDupliacateDir(request.getDirectorName().trim());

		if (response != null) {
			return ResponseEntity.ok().body("Director Name is Existed");
		}
		return ResponseEntity.ok().body("");
	}

	@PostMapping("/admin/director/delete/{id}")
	public ResponseEntity<?> DeleteDirector(@PathVariable("id") int dirId) {
		Boolean result = directorService.deleteDirector(dirId);

		if (result) {
			return ResponseEntity.ok().body("Delete Success");
		} else {
			return ResponseEntity.badRequest().body("Save  Fail");
		}
	}

	@GetMapping("/staff/director/{id}")
	public ResponseEntity<?> getDirectorById(@PathVariable("id") int directorId) {
		DirectorResponse response = directorService.getDirectorById(directorId);
		if (response != null) {
			return ResponseEntity.ok().body(response);
		} else {
			return ResponseEntity.badRequest().body("Save  Fail");
		}
	}
}
