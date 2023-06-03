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

import group.java.backend.model.entity.Cast;
import group.java.backend.model.request.CastRequest;
import group.java.backend.model.response.CastResponse;
import group.java.backend.service.CastService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CastController {
	@Autowired
	private CastService castService;

	@GetMapping("/staff/cast")
	public ResponseEntity<?> getListCast() {
		List<CastResponse> castResponseList = castService.getListCast();

		if (castResponseList != null && castResponseList.size() > 0) {
			return ResponseEntity.ok().body(castResponseList);
		} else {
			return ResponseEntity.badRequest().body("Get Cast Failed!");
		}
	}

	@PostMapping("/admin/cast/save")
	public ResponseEntity<?> saveCast(@RequestBody CastRequest request) {
		Cast cast = new Cast();
		if (request.getCastId() > 0) {
			CastResponse currentItem = castService.getCastById(request.getCastId());
			cast.setId(currentItem.getCastId());
			cast.setImage(currentItem.getImage());
		}

		cast.setCastName(request.getCastName().trim());
		
		if(request.getImage() != null && !request.getImage().isEmpty()) {
			cast.setImage(request.getImage());
		}

		CastResponse response = castService.saveCastById(cast);

		if (response != null) {
			return ResponseEntity.ok().body(response);
		} else {
			return ResponseEntity.badRequest().body("Save Cast Failed!");
		}

	}

	@PostMapping("/admin/cast/checkDuplicate")
	public ResponseEntity<?> checkExist(@RequestBody CastRequest request) {

		CastResponse res = castService.checkDuplicate(request.getCastName().trim());

		if (res != null) {
			return ResponseEntity.ok().body("Cast Name is Existed");
		} 
		return ResponseEntity.ok().body("");
	}

	@PostMapping("/admin/cast/delete/{id}")
	public ResponseEntity<?> DeleteCast(@PathVariable("id") int castId) {
		Boolean result = castService.deleteCast(castId);

		if (result) {
			return ResponseEntity.ok().body("Delete Success");
		} else {
			return ResponseEntity.badRequest().body("Save Failed");
		}
	}

	@GetMapping("/staff/cast/{id}")
	public ResponseEntity<?> getCastById(@PathVariable("id") int castId) {
		CastResponse result = castService.getCastById(castId);

		if (result != null) {
			return ResponseEntity.ok().body(result);
		} else {
			return ResponseEntity.badRequest().body("Save Failed");
		}
	}

}
