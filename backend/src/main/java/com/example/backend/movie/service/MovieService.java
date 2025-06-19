package com.example.backend.movie.service;

import com.example.backend.movie.model.Movie;
import java.util.List;

public interface MovieService {
    List<Movie> getAllMovies();
    Movie getMovieById(int id);
    Movie saveMovie(Movie movie);
    void deleteMovie(int id);
}
