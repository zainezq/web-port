package project.com.Ilm_Learn.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import project.com.Ilm_Learn.entities.User;
import project.com.Ilm_Learn.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Replace this with your user retrieval logic
        if ("user".equals(username)) {
            return org.springframework.security.core.userdetails.User
                    .withUsername("user")
                    .password("{noop}password") // {noop} indicates no password encoding for demo purposes
                    .authorities("USER")
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found");
        }
    }


    public List<User> getAllUsers() {
        System.out.println(userRepository.findAll());
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void createUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id);
        if (user != null) {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            userRepository.update(user);
        }
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
