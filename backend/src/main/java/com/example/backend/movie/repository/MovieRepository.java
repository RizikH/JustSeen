package com.example.backend.movie.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.movie.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    
}
