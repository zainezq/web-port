package project.com.Ilm_Learn.respository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import project.com.Ilm_Learn.entities.User;

import java.util.List;

@Repository
public class UserRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> findAll() {
        return jdbcTemplate.query("SELECT * FROM users", new BeanPropertyRowMapper<>(User.class));
    }

    public User findById(Long id) {
        return jdbcTemplate.queryForObject("SELECT * FROM users WHERE id = ?", new BeanPropertyRowMapper<>(User.class), id);
    }

    public int save(User user) {
        return jdbcTemplate.update("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                user.getName(), user.getEmail(), user.getPassword());
    }

    public int update(User user) {
        return jdbcTemplate.update("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
                user.getName(), user.getEmail(), user.getPassword(), user.getId());
    }

    public int deleteById(Long id) {
        return jdbcTemplate.update("DELETE FROM users WHERE id = ?", id);
    }
}
