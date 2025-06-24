package com.example.backend.movie.dto;

import lombok.Data;

@Data
public class MovieDto {
    private int id;
    private String title;
    private String backdrop_path;
    private String poster_path;
    private String release_date;
    private double vote_average;
    private int vote_count;
}