package com.example.backend.usermovie.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.usermovie.model.UserMovie;
import com.example.backend.usermovie.service.UserMovieService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/usermovies")
public class UserMovieController {

    @Autowired
    private UserMovieService userMovieService;

    @PostMapping
    public UserMovie save(@RequestBody UserMovie userMovie) {
        System.out.println("Received UserMovie: " + userMovie);
        return userMovieService.save(userMovie);
    }

    @GetMapping("/user/{userId}")
    public List<UserMovie> getMoviesByUser(@PathVariable UUID userId) {
        return userMovieService.getMoviesByUser(userId);
    }

    @GetMapping("/user/{userId}/movie/{movieId}")
    public ResponseEntity<UserMovie> getUserMovie(@PathVariable UUID userId, @PathVariable int movieId) {
        Optional<UserMovie> found = userMovieService.getUserMovie(userId, movieId);
        return found.map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(null));
    }

    @GetMapping("/movie/{movieId}")
    public List<UserMovie> getUsersByMovie(@PathVariable int movieId) {
        return userMovieService.getUsersByMovie(movieId);
    }   

    @DeleteMapping("/{id}")
    public void deleteUserMovie(@PathVariable Long id) {
        userMovieService.deleteUserMovie(id);
    }

}
