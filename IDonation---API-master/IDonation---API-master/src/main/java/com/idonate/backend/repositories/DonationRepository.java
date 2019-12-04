package com.idonate.backend.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.idonate.backend.domains.Donation;

@Repository
public interface DonationRepository extends MongoRepository<Donation, String> {

	@Query("{'$or': [{'empresa.id': ?0}, {'pessoa.id': ?0}]}")
	List<Donation> findByIdGrantor(String id);

	@Query("{'ong.id': ?0}")
	List<Donation> findByOng(String id);

}
