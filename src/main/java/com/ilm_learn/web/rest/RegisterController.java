package com.ilm_learn.web.rest;

import com.ilm_learn.entities.User;
import com.ilm_learn.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/register")
public class RegisterController {
    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        // Check if password and confirmPassword match
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }

        // work factor of bcrypt
        int strength = 10;
        BCryptPasswordEncoder bCryptPasswordEncoder =
                new BCryptPasswordEncoder(strength, new SecureRandom());
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword()); //hashes the password
        user.setPassword(encodedPassword); //stores the hashed password in the database
        user.setConfirmPassword(encodedPassword); //stores the hashed password in the confirm password field
        user.setRoles(Collections.singleton("ROLE_USER"));
        userService.createUser(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User created successfully");

        return ResponseEntity.ok(response);
    }
}
