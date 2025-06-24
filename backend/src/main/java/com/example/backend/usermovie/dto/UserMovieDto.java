// UserMovieDto.java
package com.example.backend.usermovie.dto;

import lombok.Data;
import java.util.UUID;

@Data
public class UserMovieDto {
    private Long id;
    private UUID userId;
    private int movieId;
}
