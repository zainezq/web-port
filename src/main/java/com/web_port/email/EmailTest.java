package com.web_port.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailTest implements CommandLineRunner {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public  void run(String... args) throws Exception {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("zaineulabideen@outlook.com");
            mailMessage.setTo("zaineulabideen@outlook.com");
            mailMessage.setSubject("Test Email");
            mailMessage.setText("This is a test email.");

            mailSender.send(mailMessage);
            System.out.println("Email sent successfully!");
        } catch (Exception e) {
            System.err.println("Error sending email: " + e.getMessage());
        }
    }


}
