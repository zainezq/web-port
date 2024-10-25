package com.sharp_study.sharp_study;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
public class SharpStudyApplication {

	public static void main(String[] args) {
		SpringApplication.run(SharpStudyApplication.class, args);
	}

}
