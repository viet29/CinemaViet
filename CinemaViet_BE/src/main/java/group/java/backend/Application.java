package group.java.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

//	@Bean
//	CommandLineRunner run(RoleService roleService, UserService userService) {
//		return args -> {
//			roleService.saveRole(new Role("Role_Admin"));
//			roleService.saveRole(new Role("Role_Client"));
//			roleService.saveRole(new Role("Role_Super_Admin"));
//			roleService.saveRole(new Role("Role_staff"));
//			User user1 = new User("admin1", "12345678", "Nguyen Admin", "admin1@gmail.com", "0312345678", "Ha Noi", 1,new Date());
//			User user2 = new User("client1", "12345678", "Thi Client", "client1@gmail.com", "0312345678", "Ha Noi", 1,new Date());
//			User user3 = new User("superadmin", "12345678", "Nguyen Super Admin", "superadmin1@gmail.com", "0312345678",
//					"Ha Noi", 1 , new Date());
//			User user4 = new User("staff1", "12345678", "Thi staff", "staff1@gmail.com", "0312345678", "Ha Noi", 1,new Date());
//			userService.saveUser(user1 ,1);
//			userService.saveUser(user3,1);
//			userService.saveUser(user2,1);
//			userService.saveUser(user4,1);
//			userService.addRoleToUser("admin1", "Role_Admin");
//			userService.addRoleToUser("client1", "Role_Client");
//			userService.addRoleToUser("superadmin", "Role_Super_Admin");
//			userService.addRoleToUser("staff1", "Role_staff");
//		};
//	}
}
