package com.example.backend.user.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    private UUID id;
    private String email;
    private String username;
}
