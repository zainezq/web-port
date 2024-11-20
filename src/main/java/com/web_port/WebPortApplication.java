package com.web_port;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class WebPortApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebPortApplication.class, args);
    }

}
