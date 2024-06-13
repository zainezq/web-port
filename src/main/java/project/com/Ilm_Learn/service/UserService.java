package project.com.Ilm_Learn.service;

import org.springframework.web.bind.annotation.GetMapping;
import project.com.Ilm_Learn.User;
import project.com.Ilm_Learn.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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
