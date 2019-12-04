package com.idonate.backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.idonate.backend.domains.Empresa;

@Repository
public interface EmpresaRepository extends MongoRepository<Empresa, String> {

	@Query("{'pass.cnpj': ?0}")
	Optional<Empresa> findByCnpj(String cnpj);

}
