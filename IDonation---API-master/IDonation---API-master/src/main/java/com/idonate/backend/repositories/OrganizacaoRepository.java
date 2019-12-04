package com.idonate.backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.idonate.backend.domains.Organizacao;

@Repository
public interface OrganizacaoRepository extends MongoRepository<Organizacao, String> {

	@Query("{'pass.cnpj': ?0}")
	Optional<Organizacao> findByCnpj(String cnpj);

}
