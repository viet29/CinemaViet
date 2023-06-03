package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Director;
import group.java.backend.model.response.DirectorResponse;

@Service
public interface DirectorService {
	List<DirectorResponse> getListDirector();
	DirectorResponse getDirectorById(int id);
	DirectorResponse saveDirectorById(Director director);
	Boolean deleteDirector(int director);
	Director getDirector(int id);
	DirectorResponse checkDupliacateDir(String dirName);
}
