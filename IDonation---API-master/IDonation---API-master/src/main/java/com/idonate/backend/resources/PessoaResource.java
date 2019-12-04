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

import com.idonate.backend.domains.Pessoa;
import com.idonate.backend.domains.pass.PessoaPass;
import com.idonate.backend.services.PessoaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/pessoa")
@CrossOrigin("*")
@Api(value = "Pessoa Fisica")
public class PessoaResource {

	@Autowired
	private PessoaService pessoaService;

	@GetMapping
	@ApiOperation("Retorna todas as pessoa cadastradas.")
	public ResponseEntity<List<Pessoa>> getAllPeople() {
		return ResponseEntity.ok().body(pessoaService.getAllPessoas());
	}

	@GetMapping("/id/{id}")
	@ApiOperation("Retorna uma pessoa através do id passado.")
	public ResponseEntity<Pessoa> getfindById(@PathVariable String id) {
		Pessoa pessoa = pessoaService.findById(id);
		return ResponseEntity.ok().body(pessoa);
	}

	@GetMapping("/cpf/{cpf}")
	@ApiOperation("Retorna uma pessoa através do cpf passado.")
	public ResponseEntity<Pessoa> getCpf(@PathVariable String cpf) {
		Pessoa pessoa = pessoaService.findByCpf(cpf);
		return ResponseEntity.ok().body(pessoa);
	}

	@PostMapping("/cadastrar")
	@ApiOperation("Cadastra uma nova pessoa.")
	public void cadastrar(@RequestBody Pessoa p) {
		pessoaService.salvar(p);
//		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(p.getId()).toUri();
	}

	@PostMapping("/login")
	@ApiOperation(value = "Autentica uma pessoa através de login e senha.")
	public ResponseEntity<Pessoa> logar(@RequestBody PessoaPass pass) {
		if (pessoaService.autenticate(pass)) {
			Pessoa body = pessoaService.findByCpf(pass.getCpf());
			return ResponseEntity.ok().body(body);
		}
		return ResponseEntity.badRequest().build();
	}

	@PutMapping("/update/{id}")
	@ApiOperation("Atualiza uma pessoa.")
	public ResponseEntity<Void> update(@RequestBody Pessoa p, @PathVariable String id) {
		p.setId(id);
		p = pessoaService.update(p);
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping("/logout")
	@ApiOperation(value = "Desloga um usuário")
	public ResponseEntity<String> logout(@RequestBody Pessoa pessoa){
		pessoaService.logout(pessoa);
		pessoaService.logUsuariosLogados(pessoa, "Deslogado");
		return ResponseEntity.ok("Deslogado com sucesso!");
	}

}
