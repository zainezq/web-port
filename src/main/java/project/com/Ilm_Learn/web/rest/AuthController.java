package project.com.Ilm_Learn.web.rest;
import io.jsonwebtoken.Jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import project.com.Ilm_Learn.entities.User;
import project.com.Ilm_Learn.security.AuthenticationRequest;
import project.com.Ilm_Learn.security.AuthenticationResponse;
import project.com.Ilm_Learn.security.JwtUtil;
import project.com.Ilm_Learn.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

        try {
            System.out.println("im inside here: " + authenticationRequest.getUsername() + " also password: " + authenticationRequest.getPassword());
            Authentication authenticate = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
            System.out.println(" authenticate: " + authenticate);
        } catch (AuthenticationException e) {
            throw new Exception("Incorrect username or password", e);
        }
        System.out.println("User found with name: " + authenticationRequest.getUsername());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        System.out.println("did this work?" + userDetails.getUsername() + " " + userDetails.getPassword() + " " + userDetails.getAuthorities() + " " + userDetails.isEnabled());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
