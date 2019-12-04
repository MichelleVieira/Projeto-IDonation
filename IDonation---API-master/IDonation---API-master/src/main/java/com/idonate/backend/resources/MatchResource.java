package com.idonate.backend.resources;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.idonate.backend.domains.Match;
import com.idonate.backend.services.MatchService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/match")
@CrossOrigin(origins = "*")
@Api(value = "Doações")
public class MatchResource {
	
	@Autowired
	private MatchService matchService;
	
	@GetMapping("/{id}")
	@ApiOperation("Retorna matches por doações.")
	public ResponseEntity<List<Match>> getMatchsById(@PathVariable String id){
		List<Match> resposta = matchService.getMatchesById(id);
		
		if(resposta.isEmpty())
			return ResponseEntity.noContent().build();
		
		return ResponseEntity.ok(resposta);
	}
	
	@PostMapping
	@ApiOperation("Registra um match.")
	public ResponseEntity<Match> setMatch(@RequestBody Match match) {
		Match resposta = matchService.setMatch(match);
		if(resposta == null){
			return ResponseEntity.noContent().build();
		}else{
			return ResponseEntity.ok(resposta);
		}
	}

	@GetMapping
	@ApiOperation("recuperar todos os matchs")
	public ResponseEntity<List<Match>> getAllMatchs(){
		List<Match> resp = matchService.getAllMatches();
		if(resp.isEmpty()){
			return ResponseEntity.noContent().build();
		}else{
			return ResponseEntity.ok(resp);
		}		
	}

	@GetMapping("/user/{id}")
	@ApiOperation("recupera os matchs pelo id do doador/ong")
	public ResponseEntity<List<Match>> getAllByIdUser(@PathVariable String id){
		List<Match> resp = matchService.getAllByIdUser(id);
		if(resp.isEmpty()){
			return ResponseEntity.noContent().build();
		}else{
			return ResponseEntity.ok(resp);
		}
	}
	
}
