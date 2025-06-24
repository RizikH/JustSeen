package com.example.backend.usermovie.dto;

import com.example.backend.movie.dto.MovieDto;
import lombok.Data;

import java.util.UUID;

@Data
public class UserMovieDto {
    private Long id;
    private UUID userId;
    private MovieDto movie;
    private float musicScore;
    private float actingScore;
    private float storyScore;
    private float overallScore;
}
