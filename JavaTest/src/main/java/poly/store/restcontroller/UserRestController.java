package poly.store.restcontroller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import poly.store.entity.Users;
import poly.store.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/user")
public class UserRestController {
	@Autowired
	UserService accountService;
	
	@PreAuthorize("isAuthenticated()")
	@GetMapping()
	public ResponseEntity<List<Users>>findAll(){
		return accountService.findAll();
	}
	
	
	@PostMapping()
	public ResponseEntity<Users> create(@RequestBody Users user) {
		return accountService.create(user);
	}

	@PreAuthorize("isAuthenticated()")
	@PutMapping()
	public ResponseEntity<Users> update(@RequestBody Users user) {
		return accountService.update(user);
	}

	@PreAuthorize("isAuthenticated()")
	@DeleteMapping("{username}")
	public ResponseEntity<Void> delete(@PathVariable("username") String id) {
		return accountService.delete(id);
	}

}
