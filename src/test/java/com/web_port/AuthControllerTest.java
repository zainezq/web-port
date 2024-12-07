package com.web_port;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.web_port.security.AuthenticationRequest;
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
public class AuthControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String base_url = "http://localhost:9000";
    @Autowired
    private MockMvc mockMvc;

    @Test
    void testCreateAuthenticationToken() throws Exception {
        // Create an authentication request
        AuthenticationRequest authenticationRequest = new AuthenticationRequest("password123", "testUser");

        // Perform the authentication request
        mockMvc.perform(post(base_url + "/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticationRequest)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().string(org.hamcrest.Matchers.containsString("jwt")));

        // Perform the authentication request with invalid credentials
        authenticationRequest = new AuthenticationRequest("password456", "testUser");
        mockMvc.perform(post(base_url + "/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authenticationRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string("Invalid credentials"));
    }

}
