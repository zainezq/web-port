package com.web_port.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String userEmail, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("aphophus03@gmail.com"); // Your email address
        mailMessage.setTo("zaineulabideen@outlook.com");   // Receiving your email
        mailMessage.setSubject(subject);
        mailMessage.setText("Message from: " + userEmail + "\n\n" + message);

        mailSender.send(mailMessage);
    }
}
