package rva.controllers;

import java.util.Collection;

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
import io.swagger.annotations.ApiOperation;
import rva.jpa.Grupa;
import rva.jpa.Student;
import rva.repository.GrupaRepository;
import rva.repository.StudentRepository;

@Api(tags = {"Student CRUD operacije"})
@RestController
@CrossOrigin
public class StudentRestController {
	
	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private GrupaRepository grupaRepository;

	@ApiOperation(value="Vraća kolekciju svih studenata")
	@GetMapping("student")
	public Collection<Student> getStudenti() {
		return studentRepository.findAll();
	}
	
	@ApiOperation(value="Vraća studenta na osnovu prosleđenog id-ja")
	@GetMapping("student/{id}")
	public Student getStudent(@PathVariable("id") Integer id) {

		return studentRepository.getOne(id);
	}
	
	@ApiOperation(value="Vraća kolekciju studenata na osnovu prosleđenog broja indeksa")
	@GetMapping("studentBrInd/{brojIndeksa}")
	public Collection<Student> getStudentiByBrInd(@PathVariable("brojIndeksa") String brojIndeksa) {

		return studentRepository.findByBrojIndeksaContainingIgnoreCase(brojIndeksa);
	}
	
	@ApiOperation(value="Vraća kolekciju studenata na osnovu id-ja grupe")
	@GetMapping("studentiGrupa/{id}") 
	public Collection<Student> getStudentiGrupa(@PathVariable ("id") Integer id) {
		
		Grupa g = grupaRepository.getOne(id);
		
		return studentRepository.findByGrupa(g); 
	}
	
	@ApiOperation(value="Dodavanje novog studenta")
	@PostMapping("student")
	public ResponseEntity<Student> insertStudent(@RequestBody Student student) {

		if (!studentRepository.existsById(student.getId())) {

			studentRepository.save(student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}

		return new ResponseEntity<Student>(HttpStatus.CONFLICT);
	}

	@ApiOperation(value="Izmena podataka o studentu")
	@PutMapping("student")
	public ResponseEntity<Student> updateStudent(@RequestBody Student student) {

		if (studentRepository.existsById(student.getId())) {

			studentRepository.save(student);
			return new ResponseEntity<Student>(HttpStatus.OK);
		}
		return new ResponseEntity<Student>(HttpStatus.CONFLICT);

	}

	@ApiOperation(value="Brisanje podataka o studentu na osnovu prosleđenog id-ja")
	@DeleteMapping("student/{id}")
	public ResponseEntity<Student> deleteStudent(@PathVariable("id") Integer id) {

		if (!studentRepository.existsById(id))
			return new ResponseEntity<Student>(HttpStatus.NO_CONTENT);

		studentRepository.deleteById(id);

		if (id == -100) {
			jdbcTemplate.execute("INSERT INTO \"student\"(\"id\", \"ime\", \"prezime\", \"broj_indeksa\", \"grupa\", \"projekat\") VALUES (-100, 'Test', 'Test', 'Test', -50, -50)");
		}

		return new ResponseEntity<Student>(HttpStatus.OK);
	}
}










