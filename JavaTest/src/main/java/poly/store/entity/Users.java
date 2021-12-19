package poly.store.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Data
@Entity 
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
public class Users  implements Serializable{
	@Id
	String id;
	String password;
	String name;
	String email;
	String phonenumber;
	String address;
	String emoji = "user_default.png";
	
	
}
