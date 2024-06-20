package project.com.Ilm_Learn.web.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.com.Ilm_Learn.entities.User;
import project.com.Ilm_Learn.service.UserService;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/register")
public class RegisterController {
    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> register(@RequestBody User user) {

        // work factor of bcrypt
        int strength = 10;
        BCryptPasswordEncoder bCryptPasswordEncoder =
                new BCryptPasswordEncoder(strength, new SecureRandom());
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword()); //hashes the password
        user.setPassword(encodedPassword); //stores the hashed password in the database
        user.setConfirmPassword(encodedPassword); //stores the hashed password in the confirm password field
        System.out.println(user.getPassword());
        // Save the user to the database
        userService.createUser(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User created successfully");

        return ResponseEntity.ok(response);
    }
}
