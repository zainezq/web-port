package project.com.Ilm_Learn.web.rest;
import io.jsonwebtoken.Jwt;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
import project.com.Ilm_Learn.security.AuthenticationResponse;
import project.com.Ilm_Learn.security.JwtUtil;
import project.com.Ilm_Learn.service.UserService;

@RestController
@RequestMapping("/api/auth")
@Api(tags = "Auth Controller", description = "Sample API operations")
public class AuthController {

    private AuthenticationManager authenticationManager;


    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    @ApiOperation("Returns a sample greeting")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody User user) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getName(), user.getPassword())
            );
        } catch (AuthenticationException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userService
                .loadUserByUsername(user.getName());

        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
