package com.web_port.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendEmail(@RequestBody EmailRequest emailRequest) {
        emailService.sendEmail(emailRequest.getUserEmail(), emailRequest.getSubject(), emailRequest.getMessage());
        Map<String, String> response = new HashMap<>();
        response.put("message", "Email sent successfully");
        return ResponseEntity.ok(response);
    }


}

// DTO for the request
class EmailRequest {
    private String userEmail;
    private String subject;
    private String message;

    // Getters and Setters
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
