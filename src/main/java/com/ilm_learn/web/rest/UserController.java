package com.ilm_learn.web.rest;

import com.ilm_learn.entities.User;
import com.ilm_learn.repository.UserRepository;
import com.ilm_learn.security.JwtRequired;
import com.ilm_learn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    /* see below for a simplified version using custom annotations
    @GetMapping("/me")
    public ResponseEntity<User> getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            Object principal = auth.getPrincipal();
            System.out.println("Principal: " + principal);

            if (principal instanceof UserDetails) {
                String username = ((UserDetails) principal).getUsername();
                // Retrieve the user from the database using the username
                User user = userRepository.findByUsername(username);
                // Return the user's data
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        }
        // If the user is not authenticated, return a 401 Unauthorized response
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
    */

    @JwtRequired
    @GetMapping("/me")
    public ResponseEntity<User> getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) auth.getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername());
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @JwtRequired
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }



}

