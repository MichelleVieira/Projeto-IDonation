package com.idonate.backend.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.idonate.backend.domains.Curtidas;

@Repository
public interface CurtidaRepository extends MongoRepository<Curtidas, String>{

}
