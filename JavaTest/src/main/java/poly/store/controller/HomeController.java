package poly.store.controller;


import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	@PreAuthorize("isAuthenticated()")
    @GetMapping({"/index","/"})
    public String admin() {
    	return "redirect:/assets/admin/index.html";
    }
    @GetMapping("/user/logup/form")
    public String loginForm(Model model) {
 	   return "user/logup";
    }
}
