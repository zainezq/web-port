package project.com.Ilm_Learn.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.com.Ilm_Learn.entities.Entry;

@Repository
public interface EntryRepository extends JpaRepository<Entry, Long> {
}
