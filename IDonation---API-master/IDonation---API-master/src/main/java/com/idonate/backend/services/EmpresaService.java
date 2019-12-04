package com.idonate.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idonate.backend.domains.Empresa;
import com.idonate.backend.domains.pass.JuridicoPass;
import com.idonate.backend.repositories.EmpresaRepository;
import com.idonate.backend.services.exceptions.AuthenticationFailedException;
import com.idonate.backend.services.exceptions.ObjectNotFoundException;

@Service
public class EmpresaService {

	@Autowired
	private EmpresaRepository repository;

	public List<Empresa> getAllEmpresas() {
		return repository.findAll();
	}

	public Empresa findById(String id) {
		Optional<Empresa> opEmpresa = repository.findById(id);
		Empresa Empresa = opEmpresa.orElseThrow(() -> new ObjectNotFoundException("Empresa não encontrada"));
		return Empresa;
	}

	public Empresa findByCnpj(String cpf) {
		Optional<Empresa> opEmpresa = repository.findByCnpj(cpf);
		Empresa Empresa = opEmpresa.orElseThrow(() -> new ObjectNotFoundException("Empresa não encontrada"));
		return Empresa;
	}

	public void salvar(Empresa p) {
		repository.save(p);
	}

	public Empresa update(Empresa empresa) {
		Empresa newEmpresa = findById(empresa.getId());
		updateData(newEmpresa, empresa);
		return repository.save(newEmpresa);
	}

	public boolean autenticate(JuridicoPass pass) {
		Empresa Empresa = findByCnpj(pass.getCnpj());
		Integer EmpresaPass = Empresa.getPass().hashCode();
		if (EmpresaPass.equals(pass.hashCode())) {
			return true;
		}
		throw new AuthenticationFailedException("Falha na autenticação");
	}

	public Empresa updateData(Empresa newEmpresa, Empresa empresa) {
		newEmpresa.setId(empresa.getId());
		newEmpresa.setEmail(empresa.getEmail());
		newEmpresa.setRazao_social(empresa.getRazao_social());
		newEmpresa.setPass(empresa.getPass());
		return newEmpresa;
	}

}
