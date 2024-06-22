package project.com.Ilm_Learn.web.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.com.Ilm_Learn.entities.Entry;
import project.com.Ilm_Learn.service.EntryService;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
public class EntryController {
  @Autowired
  private EntryService entryService;

  @GetMapping("/")
  public List<Entry> getAllEntries() {
    return entryService.getAllEntries();
  }

  @GetMapping("/{id}")
  public Entry getEntryById(@PathVariable Long id) {
    return entryService.getEntryById(id);
  }

  @PostMapping("/")
  public void createEntry(@RequestBody Entry entry) {
    entryService.createEntry(entry);
  }

  @PutMapping("/{id}")
  public void updateEntry(@PathVariable Long id, @RequestBody Entry entry) {
    entryService.updateEntry(id, entry);
  }

  @DeleteMapping("/{id}")
  public void deleteEntry(@PathVariable Long id) {
    entryService.deleteEntry(id);
  }
}
