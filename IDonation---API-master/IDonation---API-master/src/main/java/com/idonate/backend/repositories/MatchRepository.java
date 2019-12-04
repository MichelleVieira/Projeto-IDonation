package com.idonate.backend.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.idonate.backend.domains.Match;

@Repository
public interface MatchRepository extends MongoRepository<Match, String>{

	@Query(" {'$or': [{'idDoador': ?0}, {'idOng': ?0}]} ")
	List<Match> findMatchsById(String id);

	@Query(" {'$or': [{'idDoador': ?0}, {'idOng': ?0}]} ")
	List<Match> findAllByIdUser(String id);
}
