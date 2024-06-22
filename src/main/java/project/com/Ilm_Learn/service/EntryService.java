package project.com.Ilm_Learn.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.com.Ilm_Learn.entities.Entry;
import project.com.Ilm_Learn.respository.EntryRepository;

import java.util.List;

@Service
public class EntryService  {
  @Autowired
  private EntryRepository entryRepository;

  public void createEntry(Entry entry) {
    entryRepository.save(entry);
  }

  public Entry getEntryById(Long id) {
    return entryRepository.findById(id).get();
  }

  public List<Entry> getAllEntries() {
    return entryRepository.findAll();
  }

  public void deleteEntry(Long id) {
    entryRepository.deleteById(id);
  }

  public void updateEntry(Long id, Entry entry) {
    entryRepository.findById(id).ifPresent(existingEntry -> {
      existingEntry.setTitle(entry.getTitle());
      existingEntry.setContent(entry.getContent());
      existingEntry.setTags(entry.getTags());
      entryRepository.save(existingEntry);
    });
  }

}
