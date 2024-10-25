package com.ilm_learn.security;

import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class JwtAspect {

    @Autowired
    private JwtUtil jwtUtil;

    @Before("@annotation(com.ilm_learn.security.JwtRequired)")
    public void validateJwt(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized: No JWT token provided");
        }

        String jwt = authorizationHeader.substring(7); // Extract JWT from "Bearer <token>"
        String username = jwtUtil.extractUsername(jwt);

        if (username == null || SecurityContextHolder.getContext().getAuthentication() == null) {
            throw new RuntimeException("Unauthorized: Invalid JWT token");
        }

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (!username.equals(userDetails.getUsername()) || !jwtUtil.validateToken(jwt, userDetails)) {
            throw new RuntimeException("Unauthorized: Invalid JWT token");
        }
    }
}
