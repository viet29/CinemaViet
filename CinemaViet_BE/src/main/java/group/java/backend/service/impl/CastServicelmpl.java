package group.java.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Cast;
import group.java.backend.model.response.CastResponse;
import group.java.backend.repository.CastRepository;
import group.java.backend.service.CastService;

@Service
public class CastServicelmpl implements CastService {
	@Autowired
	private CastRepository castRepo;

	@Override
	public List<CastResponse> getListCast() {
		List<Cast> lstCast = castRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
		List<CastResponse> lstRespon = new ArrayList<CastResponse>();
		if (lstCast != null && lstCast.size() > 0) {
			for (Cast e : lstCast) {
				CastResponse respon = convertToCast(e);
				if (respon != null) {
					lstRespon.add(respon);
				}
			}
		}
		return lstRespon;
	}

	@Override
	public CastResponse getCastById(int id) {
		Cast cast = castRepo.getCastById(id);
		return convertToCast(cast);
	}

	@Override
	public CastResponse saveCastById(Cast cast) {
		Cast newCast = castRepo.save(cast);
		// TODO Auto-generated method stub
		return convertToCast(newCast);
	}

	@Override
	public Boolean deleteCast(int id) {
		Cast cast = castRepo.getCastById(id);

		try {
			castRepo.delete(cast);
			return true;
		} catch (Exception e) {
			return false;
		}
		// TODO Auto-generated method stub
	}

	public CastResponse convertToCast(Cast entity) {
		if (entity != null) {
			CastResponse eRespon = new CastResponse();
			eRespon.setCastId(entity.getId());
			eRespon.setCastName(entity.getCastName());
			eRespon.setImage(entity.getImage());

			return eRespon;
		}
		return null;
	}

	@Override
	public CastResponse checkDuplicate(String castName) {
		Cast castExists = castRepo.getCastByCastName(castName);
		return convertToCast(castExists);
	}

}
