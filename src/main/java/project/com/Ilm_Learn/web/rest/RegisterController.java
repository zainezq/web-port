package project.com.Ilm_Learn.web.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.com.Ilm_Learn.entities.User;
import project.com.Ilm_Learn.service.UserService;

import java.security.SecureRandom;

@RestController
@RequestMapping("/api/register")
public class RegisterController {
    @Autowired
    private UserService userService;
    private final int strength = 10; // work factor of bcrypt

    @PostMapping("/register")
    public void register(@RequestBody User user) {

        BCryptPasswordEncoder bCryptPasswordEncoder =
                new BCryptPasswordEncoder(strength, new SecureRandom());
        String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        System.out.println(user.getPassword());
        // Save the user to the database
        userService.createUser(user);
    }
}
