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

import com.idonate.backend.domains.Empresa;
import com.idonate.backend.domains.pass.JuridicoPass;
import com.idonate.backend.services.EmpresaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/empresa")
@CrossOrigin(origins = "*")
@Api(value = "Pessoa Jurídica")
public class EmpresaResource {

	@Autowired
	private EmpresaService empresaService;

	@GetMapping("todasEmpresas")
	@ApiOperation("Retorna todas as empresas cadastradas.")
	public ResponseEntity<List<Empresa>> getAllPeople() {
		return ResponseEntity.ok().body(empresaService.getAllEmpresas());
	}

	@GetMapping("/id/{id}")
	@ApiOperation("Retorna uma empresa através do id passado.")
	public ResponseEntity<Empresa> getfindById(@PathVariable String id) {
		Empresa Empresa = empresaService.findById(id);
		return ResponseEntity.ok().body(Empresa);
	}

	@GetMapping("/cpf/{cpf}")
	@ApiOperation("Retorna uma empresa através do cpf passado.")
	public ResponseEntity<Empresa> getCpf(@PathVariable String cpf) {
		Empresa Empresa = empresaService.findByCnpj(cpf);
		return ResponseEntity.ok().body(Empresa);
	}

	@PostMapping("/cadastrar")
	@ApiOperation("Cadastra uma nova empresa.")
	public void cadastrar(@RequestBody Empresa e) {
		empresaService.salvar(e);
//		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(e.getId()).toUri();
//		return ResponseEntity.created(uri).build();
	}

	@PostMapping("/login")
	@ApiOperation(value = "Autentica uma empresa através de login e senha.")
	public ResponseEntity<Empresa> logar(@RequestBody JuridicoPass pass) {
		if (empresaService.autenticate(pass)) {
			Empresa body = empresaService.findByCnpj(pass.getCnpj());
			return ResponseEntity.ok().body(body);
		}
		return ResponseEntity.badRequest().build();
	}

	@PutMapping("/update/{id}")
	@ApiOperation("Atualiza uma Empresa.")
	public ResponseEntity<Void> update(@RequestBody Empresa p, @PathVariable String id) {
		p.setId(id);
		p = empresaService.update(p);
		return ResponseEntity.noContent().build();
	}
	


}
