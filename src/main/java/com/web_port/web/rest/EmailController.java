package com.web_port.web.rest;

import com.web_port.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.Map;

@RestController
@RequestMapping("/api/email")
public class EmailController {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    @Autowired
    private EmailService emailService;

    @PostMapping("")
    public String sendEmail(@RequestBody Map<String, String> request) throws  MessagingException, UnsupportedEncodingException {
        String email = request.get("email");

        EmailService emailSender = new EmailService(mailSender);
        // Call the sendEmail method to send an email
        String recipientEmail = "recipient@example.com";
        String subject = "Hello from Spring Boot";
        String content = "<p>Hello,</p><p>This is a test email sent from Spring Boot.</p>";

        try {
            emailSender.sendEmail(recipientEmail, subject, content);
            return "Email sent successfully.";
        } catch (MessagingException | UnsupportedEncodingException e) {
            return "Failed to send email. Error: " + e.getMessage();
        }
    }
}
class EmailRequest {
    private String to;
    private String subject;
    private String message;

    // Getters and setters
    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
