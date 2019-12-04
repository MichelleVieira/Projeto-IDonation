package com.idonate.backend.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idonate.backend.domains.Curtidas;
import com.idonate.backend.services.CurtidaService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("curtidas")
@CrossOrigin(origins = "*")
@Api(value = "Curtidas")
public class CurtidaResource {

	@Autowired
	private CurtidaService curtidaService;
	
	@GetMapping("/{id}")
	@ApiOperation("Encontra curtidas por id.")
	public ResponseEntity<List<Curtidas>> getCurtidasById(@PathVariable String id){
		List<Curtidas> resposta = curtidaService.getCurtidasById(id);
		
		if(resposta.isEmpty())
			return ResponseEntity.noContent().build();
		
		return ResponseEntity.ok(resposta);
	}
	
	@PostMapping
	@ApiOperation("Registra curtidas.")
	public void setCurtidas(@RequestBody Curtidas curtida) {
		boolean curtido = curtidaService.setCurtida(curtida);
	}
	
}
