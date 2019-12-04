package com.idonate.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idonate.backend.domains.Organizacao;
import com.idonate.backend.domains.pass.JuridicoPass;
import com.idonate.backend.repositories.OrganizacaoRepository;
import com.idonate.backend.services.exceptions.AuthenticationFailedException;
import com.idonate.backend.services.exceptions.ObjectNotFoundException;

@Service
public class OrganizacaoService {

	@Autowired
	private OrganizacaoRepository repository;

	public List<Organizacao> getAllOrganizacaos() {
		return repository.findAll();
	}

	public Organizacao findById(String id) {
		Optional<Organizacao> opOrganizacao = repository.findById(id);
		Organizacao organizacao = opOrganizacao.orElseThrow(() -> new ObjectNotFoundException("Organizacao não encontrada"));
		return organizacao;
	}

	public Organizacao findByCnpj(String cpf) {
		Optional<Organizacao> opOrganizacao = repository.findByCnpj(cpf);
		Organizacao organizacao = opOrganizacao.orElseThrow(() -> new ObjectNotFoundException("Organizacao não encontrada"));
		return organizacao;
	}

	public void salvar(Organizacao p) {
		repository.save(p);
	}

	public Organizacao update(Organizacao organizacao) {
		Organizacao newOrganizacao = findById(organizacao.getId());
		updateData(newOrganizacao, organizacao);
		return repository.save(newOrganizacao);
	}

	public boolean autenticate(JuridicoPass pass) {
		Organizacao organizacao = findByCnpj(pass.getCnpj());
		Integer organizacaoPass = organizacao.getPass().hashCode();
		if(organizacaoPass.equals(pass.hashCode())) {
			return true;
		}
		throw new AuthenticationFailedException("Falha na autenticação");
	}

	public Organizacao updateData(Organizacao newOrganizacao, Organizacao organizacao) {
		newOrganizacao.setId(organizacao.getId());
		newOrganizacao.setEmail(organizacao.getEmail());
		newOrganizacao.setRazao_social(organizacao.getRazao_social());
		newOrganizacao.setPass(organizacao.getPass());
		return newOrganizacao;
	}

}
