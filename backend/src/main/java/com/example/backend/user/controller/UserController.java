package com.example.backend.user.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.backend.user.dto.UserDTO;
import com.example.backend.user.model.User;
import com.example.backend.user.repository.UserRepository;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Not authenticated");
        }

        String email = authentication.getName(); // extracted from JWT
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Map to DTO to hide password
        UserDTO dto = new UserDTO(user.getId(), user.getEmail(), user.getUsername());
        return ResponseEntity.ok(dto);
    }
}
