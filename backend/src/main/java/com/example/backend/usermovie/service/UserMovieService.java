package com.example.backend.usermovie.service;

import com.example.backend.movie.model.Movie;
import com.example.backend.user.model.User;
import com.example.backend.movie.repository.MovieRepository;
import com.example.backend.user.repository.UserRepository;
import com.example.backend.usermovie.model.UserMovie;
import com.example.backend.usermovie.repository.UserMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserMovieService {
    @Autowired
    private UserMovieRepository userMovieRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UserRepository userRepository;

    public UserMovie save(UserMovie userMovie) {
        float avg = 0f;

        boolean hasRated = userMovie.getMusicScore() > 0
                || userMovie.getActingScore() > 0
                || userMovie.getStoryScore() > 0;

        if (hasRated) {
            avg = (userMovie.getMusicScore()
                    + userMovie.getActingScore()
                    + userMovie.getStoryScore()) / 3f;
        }
        userMovie.setOverallScore(avg);

        UUID userId = userMovie.getUser().getId();
        int movieId = userMovie.getMovie().getId();

        // Ensure User exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Ensure Movie exists or save it
        Movie movie = movieRepository.findById(movieId).orElse(userMovie.getMovie());
        if (!movieRepository.existsById(movieId)) {
            movieRepository.save(movie);
        }

        // Check if user already rated this movie
        Optional<UserMovie> existing = userMovieRepository.findByUserIdAndMovieId(userId, movieId);

        if (existing.isPresent()) {
            UserMovie existingRating = existing.get();
            existingRating.setMusicScore(userMovie.getMusicScore());
            existingRating.setActingScore(userMovie.getActingScore());
            existingRating.setStoryScore(userMovie.getStoryScore());
            existingRating.setOverallScore(avg);
            return userMovieRepository.save(existingRating);
        }

        // Create new entry
        userMovie.setUser(user);
        userMovie.setMovie(movie);
        return userMovieRepository.save(userMovie);
    }

    public List<UserMovie> getMoviesByUser(UUID userId) {
        return userMovieRepository.findByUserId(userId);
    }

    public List<UserMovie> getUsersByMovie(int movieId) {
        return userMovieRepository.findByMovieId(movieId);
    }

    public Optional<UserMovie> getUserMovie(UUID userId, int movieId) {
        return userMovieRepository.findByUserIdAndMovieId(userId, movieId);
    }

    public void deleteUserMovie(Long id) {
        userMovieRepository.deleteById(id);
    }
}