package poly.store.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import poly.store.dao.UserDAO;
import poly.store.entity.Users;
import poly.store.service.UserService;

@Service
public class UserServiceIml implements UserService {
	@Autowired
	UserDAO adao;
	@Autowired
	HttpServletRequest req;

	@Override
	public ResponseEntity<Users> findById(String id) {
		Optional<Users> account = adao.findById(id);
		if (!account.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(account.get());
	}

	@Override
	public ResponseEntity<List<Users>> findAll() {		
		List<Users> listUser = adao.findAll();
		return ResponseEntity.ok(listUser);
	}

	@Override
	public ResponseEntity<Users> create(Users user) {
		if (adao.existsById(user.getId())) {
			return ResponseEntity.badRequest().build();
		} else {
			adao.save(user);
			return ResponseEntity.ok(user);
		}
	}

	@Override
	public ResponseEntity<Users> update(Users user) {
		if (!adao.existsById(user.getId())) {
			return ResponseEntity.notFound().build();
		}
		adao.save(user);
		return ResponseEntity.ok(user);
	}

	@Override
	public ResponseEntity<Void> delete(String id) {
		if (!adao.existsById(id)) {
			return ResponseEntity.notFound().build();
		} else {
			adao.deleteById(id);
			return ResponseEntity.ok().build();
		}
	}

}
