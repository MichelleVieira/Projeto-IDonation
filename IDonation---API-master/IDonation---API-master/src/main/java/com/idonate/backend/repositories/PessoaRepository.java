package com.idonate.backend.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.idonate.backend.domains.Pessoa;

@Repository
public interface PessoaRepository extends MongoRepository<Pessoa, String> {

	@Query("{'pass.cpf': ?0}")
	Optional<Pessoa> findByCpf(String cpf);

}
