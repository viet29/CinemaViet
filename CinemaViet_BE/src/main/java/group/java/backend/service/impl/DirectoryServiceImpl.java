package group.java.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Director;
import group.java.backend.model.response.DirectorResponse;
import group.java.backend.repository.DirectorRepository;
import group.java.backend.service.DirectorService;

@Service
public class DirectoryServiceImpl implements DirectorService {

	@Autowired
	private DirectorRepository directorRepo;

	@Override
	public List<DirectorResponse> getListDirector() {
		List<Director> lstDirector = directorRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<DirectorResponse> lstRespon = new ArrayList<DirectorResponse>();

		if (lstDirector != null && lstDirector.size() > 0) {
			for (Director d : lstDirector) {
				DirectorResponse respon = convertToDirector(d);

				if (respon != null) {
					lstRespon.add(respon);
				}
			}
		}

		return lstRespon;
	}

	@Override
	public DirectorResponse getDirectorById(int id) {
		Director director = directorRepo.getDirectorById(id);

		// TODO Auto-generated method stub
		return convertToDirector(director);
	}

	@Override
	public DirectorResponse saveDirectorById(Director director) {
		Director newDirector = directorRepo.save(director);
		// TODO Auto-generated method stub
		return convertToDirector(newDirector);
	}

	@Override
	public Boolean deleteDirector(int id) {
		Director director = directorRepo.getDirectorById(id);
		try {
			directorRepo.delete(director);
			return true;
		} catch (Exception e) {
			return false;
		}
		// TODO Auto-generated method stub

	}

	public DirectorResponse convertToDirector(Director entity) {
		if (entity != null) {
			DirectorResponse dRespon = new DirectorResponse();

			dRespon.setDirectorId(entity.getId());
			dRespon.setDirectorName(entity.getDirectorName());
			dRespon.setDirectorImage(entity.getDirectorImage());

			return dRespon;
		}

		return null;
	}

	@Override
	public DirectorResponse checkDupliacateDir(String dirName) {
		Director exist = directorRepo.getDirByDirName(dirName);
		// TODO Auto-generated method stub
		return convertToDirector(exist);
	}

	@Override
	public Director getDirector(int id) {
		Director director = directorRepo.getDirectorById(id);

		if (director != null) {
			return director;
		}

		// TODO Auto-generated method stub
		return null;
	}
}
