package com.studentmanagement.student_management_backend.controller;

import com.studentmanagement.student_management_backend.Login;
import com.studentmanagement.student_management_backend.repository.LoginRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginController {

    private final LoginRepository loginRepository;

    public LoginController(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    @PostMapping
    public boolean login(@RequestBody Login login) {

        Login existingLogin =
                loginRepository.findByUsername(login.getUsername());

        if (existingLogin == null) {
            return false;
        }

        return existingLogin.getPassword()
                .equals(login.getPassword());
    }
}
