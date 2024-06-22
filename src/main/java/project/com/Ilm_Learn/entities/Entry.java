package project.com.Ilm_Learn.entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "entries")  // Use a different name to avoid conflict
public class Entry implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")  // Explicit column mapping
  private Long id;

  @Column(name= "title")
  private String title;

  @Column(name = "content")
  private String content;

  @Column(name = "timestamp")
  private Long timestamp;

  @Column(name = "tags")
  private String tags;

  public Entry() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Long getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Long timestamp) {
    this.timestamp = timestamp;
  }

  public String getTags() {
    return tags;
  }

  public void setTags(String tags) {
    this.tags = tags;
  }


  @Override
  public String toString() {
    return "Entry{" +
      "id=" + id +
      ", title='" + title + '\'' +
      ", content='" + content + '\'' +
      ", timestamp=" + timestamp +
      ", tags='" + tags + '\'' +
      '}';
  }
}
