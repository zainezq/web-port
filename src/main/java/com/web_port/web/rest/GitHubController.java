package com.web_port.web.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/github")
public class GitHubController {

    private static final String GITHUB_API_URL = "https://api.github.com/users/zainezq/repos";

    @GetMapping("/repositories")
    public Object[] fetchRepositories() {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(GITHUB_API_URL, Object[].class);
    }
}