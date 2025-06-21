package com.example.backend.usermovie.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.usermovie.model.UserMovie;

public interface UserMovieRepository extends JpaRepository<UserMovie, Long> {
    List<UserMovie> findByUserId(UUID userId);

    List<UserMovie> findByMovieId(int movieId);

    Optional<UserMovie> findByUserIdAndMovieId(UUID userId, int movieId);

}
