package com.example.backend.movie.model;

import java.util.Set;

import com.example.backend.usermovie.model.UserMovie;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "movies")
public class Movie {

    @Id
    private int id;
    private String title;
    private String backdrop_path;
    private String poster_path;

    @Column(columnDefinition = "TEXT")
    private String overview;

    private String release_date;
    private double vote_average;
    private int vote_count;

    @OneToMany(mappedBy = "movie")
    @JsonIgnore
    private Set<UserMovie> userMovies;
}