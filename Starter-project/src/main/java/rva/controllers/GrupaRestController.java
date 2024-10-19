package rva.controllers;

import java.util.Collection;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import rva.jpa.Grupa;
import rva.repository.GrupaRepository;

@Api(tags ="Grupa CRUD operacije")
@RestController
@CrossOrigin
public class GrupaRestController {
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private GrupaRepository grupaRepository;
	
	@ApiOperation(value="Vraća kolekciju svih grupa")
	@GetMapping("grupa")
	public Collection<Grupa> getGrupa() {	
		return grupaRepository.findAll();
	}
	
	@ApiOperation(value="Vraća grupu na osnovu prosleđenog id-ja")
	@GetMapping("grupa/{id}")
	public Grupa getGrupaId(@PathVariable("id")Integer id) {
		return grupaRepository.getOne(id);
	}
	
	@ApiOperation(value="Vraća kolekciju grupa na osnovu oznake")
	@GetMapping("grupaOznaka/{oznaka}")
	public Collection<Grupa> getGrupaOznaka(@PathVariable("oznaka") String oznaka) {
		return grupaRepository.findByOznakaContainingIgnoreCase(oznaka);
	}
	
	@ApiOperation(value="Dodavanje nove grupe")
	@PostMapping("grupa")
	public ResponseEntity<Grupa> insertGrupa(@RequestBody Grupa grupa) {
		if (!grupaRepository.existsById(grupa.getId())) {
			grupaRepository.save(grupa);
			return new ResponseEntity<>(HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.CONFLICT);
	}
	
	@ApiOperation(value="Izmena podataka o grupi")
	@PutMapping("grupa")
	public ResponseEntity<Grupa> updateGrupa(@RequestBody Grupa grupa) {
		if(!grupaRepository.existsById(grupa.getId())) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		grupaRepository.save(grupa);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@ApiOperation(value="Brisanje grupe na osnovu prosleđenog id-ja")
	@DeleteMapping("grupa/{id}")
	public ResponseEntity<Grupa> deleteGrupa(@PathVariable("id") Integer id) {
		if(!grupaRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		grupaRepository.deleteById(id);
		if (id == -100) {
			jdbcTemplate.execute("INSERT INTO \"grupa\"(\"id\", \"oznaka\", \"smer\") VALUES (-100, 'Test', -50)");
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
