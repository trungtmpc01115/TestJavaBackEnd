package poly.store.controller;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
public class SecurityController {
   @RequestMapping("/security/login/form")
   public String loginForm(Model model) {
	   model.addAttribute("message", "Please log in!");
	   return "security/login";
   }
   
   @RequestMapping("/security/login/success")
   public String loginSuccess(Model model) {
	   model.addAttribute("message", "Logged in successfully!");
	   return "redirect:/assets/admin/index.html";
   }
   
   @RequestMapping("/security/login/error")
   public String loginError(Model model) {
	   model.addAttribute("message", "Wrong login information!");
	   return "security/login";
   }
   
   @RequestMapping("/security/unauthoried")
   public String unauthoried(Model model) {
	   model.addAttribute("message", "No access rights!");
	   return "security/login";
   }
   
   @RequestMapping("/security/logoff/success")
   public String logoffSuccess(Model model) {
	   return "security/login";
   }
   
}
