package com.idonate.backend.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idonate.backend.domains.Organizacao;
import com.idonate.backend.domains.pass.JuridicoPass;
import com.idonate.backend.services.OrganizacaoService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/Organizacao")
@CrossOrigin(origins = "*")
@Api(value = "Pessoa Jurídica")
public class OrganizacaoResource {

	@Autowired
	private OrganizacaoService organizacaoService;

	@GetMapping
	@ApiOperation("Retorna todas as Organizacaos cadastradas.")
	public ResponseEntity<List<Organizacao>> getAllPeople() {
		return ResponseEntity.ok().body(organizacaoService.getAllOrganizacaos());
	}

	@GetMapping("/id/{id}")
	@ApiOperation("Retorna uma Organizacao através do id passado.")
	public ResponseEntity<Organizacao> getfindById(@PathVariable String id) {
		Organizacao Organizacao = organizacaoService.findById(id);
		return ResponseEntity.ok().body(Organizacao);
	}

	@GetMapping("/cpf/{cpf}")
	@ApiOperation("Retorna uma Organizacao através do cpf passado.")
	public ResponseEntity<Organizacao> getCpf(@PathVariable String cpf) {
		Organizacao Organizacao = organizacaoService.findByCnpj(cpf);
		return ResponseEntity.ok().body(Organizacao);
	}

	@PostMapping("/cadastrar")
	@ApiOperation("Cadastra uma nova Organizacao.")
	public void cadastrar(@RequestBody Organizacao e) {
		organizacaoService.salvar(e);
	}

	@PostMapping("/login")
	@ApiOperation(value = "Autentica uma Organizacao através de login e senha.")
	public ResponseEntity<Organizacao> logar(@RequestBody JuridicoPass pass) {
		if (organizacaoService.autenticate(pass)) {
			Organizacao body = organizacaoService.findByCnpj(pass.getCnpj());
			return ResponseEntity.ok().body(body);
		}
		return ResponseEntity.badRequest().build();
	}

	@PutMapping("/update/{id}")
	@ApiOperation("Atualiza uma Organizacao.")
	public ResponseEntity<Void> update(@RequestBody Organizacao p, @PathVariable String id) {
		p.setId(id);
		p = organizacaoService.update(p);
		return ResponseEntity.noContent().build();
	}

}
