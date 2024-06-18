package project.com.Ilm_Learn.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.com.Ilm_Learn.entities.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository <User, Long> {

    void deleteById(Long id);

    User findByUsername(String username);
}



