package rva.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.jdbc.core.JdbcTemplate;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import rva.jpa.Projekat;
import rva.repository.ProjekatRepository;

@Api(tags = "Projekat CRUD operacije")
@RestController
@CrossOrigin
public class ProjekatRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ProjekatRepository projekatRepository;
	
	@ApiOperation(value="Vraća kolekciju svih projekata")
	@GetMapping("projekat")
	public Collection<Projekat> getProjekat() {	
		return projekatRepository.findAll();
	}
	
	@ApiOperation(value="Vraća projekat na osnovu prosleđenog id-ja")
	@GetMapping("projekat/{id}")
	public Projekat getProjekatId(@PathVariable("id")Integer id) {
		return projekatRepository.getOne(id);
	}
	
	@ApiOperation(value="Vraća kolekciju projekata na osnovu prosleđenog naziva")
	@GetMapping("projekatNaziv/{naziv}")
	public Collection<Projekat> getProjekatNaziv(@PathVariable("naziv") String naziv) {
		return projekatRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@ApiOperation(value="Dodavanje novog projekta")
	@PostMapping("projekat")
	public ResponseEntity<Projekat> insertProjekat(@RequestBody Projekat projekat) {
		if (!projekatRepository.existsById(projekat.getId())) {
			projekatRepository.save(projekat);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value="Izmena podataka o projektu")
	@PutMapping("projekat")
	public ResponseEntity<Projekat> updateProjekat(@RequestBody Projekat projekat) {
		if(!projekatRepository.existsById(projekat.getId())) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		projekatRepository.save(projekat);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value="Brisanje projekta na osnovu prosleđenog id-ja")
	@DeleteMapping("projekat/{id}")
	public ResponseEntity<Projekat> deleteProjekat(@PathVariable("id") Integer id) {
		if(!projekatRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		projekatRepository.deleteById(id);
		if (id == -100) {
			jdbcTemplate.execute("INSERT INTO \"projekat\"(\"id\", \"naziv\", \"oznaka\", \"opis\") VALUES (-100, 'Test', 'Test', 'Test')");
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
