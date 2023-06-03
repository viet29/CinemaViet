package group.java.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import group.java.backend.model.entity.Cast;
import group.java.backend.model.response.CastResponse;

@Service
public interface CastService {
	List<CastResponse> getListCast();
	CastResponse getCastById(int id);
	CastResponse saveCastById(Cast cast);
	Boolean deleteCast(int cast);
	CastResponse checkDuplicate(String castName);
}
