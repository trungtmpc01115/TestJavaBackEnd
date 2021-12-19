package poly.store.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import poly.store.entity.Users;

public interface UserService {
	ResponseEntity<Users> findById(String id);

	ResponseEntity<List<Users>> findAll();

	ResponseEntity<Users> create(Users user);

	ResponseEntity<Users> update(Users user);

	ResponseEntity<Void> delete(String id);

}
