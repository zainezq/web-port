package com.sharp_study.sharp_study.entities;

import com.sun.istack.NotNull;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "users")  // Use a different name to avoid conflict
public class User implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name= "roles")
    @ElementCollection(fetch = FetchType.EAGER)
    private Set<String> roles;
    @Column(name = "first_name")
    @NotEmpty(message = "firstName must not be empty")
    private String firstName;
    @Column(name = "last_name")
    @NotEmpty(message = "lastName must not be empty")
    private String lastName;
    @Column(name = "user_name")
    @NotEmpty(message = "username must not be empty")
    private String username;
    @Column(name = "password")
    @NotEmpty(message = "password must not be empty")
    private String password;
    @Column(name = "confirm_password")
    @NotEmpty(message = "confirmPassword must not be empty")
    private String confirmPassword;
    @Column(name = "email")
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;

    public User() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public Set<String> getRoles() {
        return roles;
    }
    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

}
