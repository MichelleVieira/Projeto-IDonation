package com.idonate.backend.resources;

import java.io.File;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.idonate.backend.domains.Donation;
import com.idonate.backend.services.DonationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/api/donation")
@CrossOrigin("*")
@Api(value = "Doações")
public class DonationResource {

	private DonationService service;

	@Autowired
	public DonationResource(DonationService service) {
		this.service = service;
	}

	@GetMapping("/todasDoacoes")
	@ApiOperation("Encontra doações.")
	public ResponseEntity<List<Donation>> getAllDonations() {
		return !service.findAll().isEmpty() ? ResponseEntity.ok(service.findAll()) : ResponseEntity.noContent().build();
	}

	@GetMapping("/doacoesOng/{id}")
	@ApiOperation("Procura doações pelo id da ong")
	public ResponseEntity<List<Donation>> findByOng(@PathVariable String id) {
		return ResponseEntity.ok().body(service.findByOng(id));
	}

	@GetMapping("/{id}")
	@ApiOperation("Encontra doações por id.")
	public ResponseEntity<Donation> getAllById(@PathVariable("id") String id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@GetMapping("/doador/{id}")
	@ApiOperation("Encontra doações por id do doador.")
	public ResponseEntity<List<Donation>> getAllByIdGrantor(@PathVariable("id") String id) {
		List<Donation> list = service.findByIdGrantor(id);
		if (list.isEmpty())
			return ResponseEntity.noContent().build();

		return ResponseEntity.ok(list);
	}

	@GetMapping("/{id}/download")
	public HttpEntity<byte[]> download(@PathVariable String id) throws IOException {
		service.writeFileCSV(id);
		byte[] arquivo = Files.readAllBytes(Paths.get(new File(".").getCanonicalPath() + "\\RelatorioDePedidos.xls"));

		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add("Content-Disposition", "attachment;filename=\"RelatorioDePedidos.xls\"");
		HttpEntity<byte[]> entity = new HttpEntity<byte[]>(arquivo, httpHeaders);

		service.cleanContent(new File(".").getCanonicalPath() + "\\RelatorioDePedidos.xls");
		return entity;
	}

	@PostMapping("/addDonation")
	@ApiOperation("Posta doações.")
	public void insertDonation(@RequestBody Donation obj) {
		service.save(obj);
	}

	@PutMapping("/updateDonation")
	@ApiOperation("Atualiza doações.")
	public ResponseEntity<Donation> updateDonation(@RequestBody Donation obj) {
		return ResponseEntity.ok().body(service.save(obj));
	}

}