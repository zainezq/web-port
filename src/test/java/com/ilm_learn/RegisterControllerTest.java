package com.ilm_learn;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilm_learn.entities.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RegisterControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String base_url = "http://localhost:8080";
    @Test
    void testRegister() throws Exception {
        // Create a valid user
        User user = new User();
        user.setUsername("testUser");
        user.setPassword("password123");
        user.setConfirmPassword("password123");
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("V2e2Q@example.com");
        user.setPhoneNumber("123-456-7890");

        // Perform the registration request
        mockMvc.perform(post(base_url + "/register/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"message\":\"User created successfully\"}")); // Change this line

        // Perform the registration request with mismatched passwords
        user.setConfirmPassword("password456");
        mockMvc.perform(post(base_url + "/register/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Passwords do not match"));
    }
}
