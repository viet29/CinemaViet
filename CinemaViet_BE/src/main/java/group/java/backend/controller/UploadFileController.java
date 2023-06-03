package group.java.backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import group.java.backend.model.request.CurrentFileRequest;
import group.java.backend.utils.ObjectUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UploadFileController {

	@PostMapping("/admin/movie/image")
	@ResponseBody
	public ResponseEntity<?> handlerFileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request)
			throws IOException {
		try {
			String root = "src/main/";
			String folder = "upload/image/movie_image/";
			return saveFile(file, root, folder);
		} catch (Exception e) {
			e.printStackTrace();

			return ResponseEntity.badRequest().body("Upload file failed!");
		}
	}

	@PostMapping("/admin/cast/image")
	@ResponseBody
	public ResponseEntity<?> handlerFileUploadFileCast(@RequestParam("file") MultipartFile file,
			HttpServletRequest request) throws IOException {
		try {
			String root = "src/main/";
			String folder = "upload/image/cast_image/";
			return saveFile(file, root, folder);
		} catch (Exception e) {
			e.printStackTrace();

			return ResponseEntity.badRequest().body("Upload file failed!");
		}
	}

	private ResponseEntity<?> saveFile(@RequestParam("file") MultipartFile file, String root, String folder) throws IOException {
		String org_filename = file.getOriginalFilename();
		String str_filename = ObjectUtils.getUUId().toString() + org_filename.split(".", 2)[1];

		File dir = new File(root + folder);

		if (!dir.exists()) {
			dir.mkdirs();
		}

		byte[] bytes = file.getBytes();
		Files.write(Paths.get(root + folder + str_filename), bytes);

		return ResponseEntity.ok().body("/" + folder + str_filename);
	}

	@PostMapping("/admin/director/image")
	@ResponseBody
	public ResponseEntity<?> handlerFileUploadFileDirector(@RequestParam("file") MultipartFile file,
			HttpServletRequest request) throws IOException {
		try {
			String root = "src/main/";
			String folder = "upload/image/director_image/";
			return saveFile(file, root, folder);
		} catch (Exception e) {
			e.printStackTrace();

			return ResponseEntity.badRequest().body("Upload file failed!");
		}
	}

	@PostMapping("/admin/delete/file")
	public ResponseEntity<?> HandlerDeleteFIle(@RequestBody CurrentFileRequest request) {
		String paths = request.getFileFath().replaceAll("http://localhost:8080", "");
		String root = "src/main";
		try {

			File fileToDelete = FileUtils.getFile(root + paths);
			boolean success = FileUtils.deleteQuietly(fileToDelete);
			if (success) {
				return ResponseEntity.ok().body("Done");
			} else {
				return ResponseEntity.badRequest().body("Fail");
			}
		} catch (Exception e) {

			return ResponseEntity.badRequest().body("Fail");
		}
	}

}
