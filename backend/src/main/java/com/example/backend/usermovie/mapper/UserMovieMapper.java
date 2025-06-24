package com.example.backend.usermovie.mapper;

import com.example.backend.movie.dto.MovieDto;
import com.example.backend.movie.model.Movie;
import com.example.backend.usermovie.dto.UserMovieDto;
import com.example.backend.usermovie.model.UserMovie;

public class UserMovieMapper {

    public static UserMovieDto toDto(UserMovie userMovie) {
        UserMovieDto dto = new UserMovieDto();
        dto.setId(userMovie.getId());
        dto.setUserId(userMovie.getUser().getId());
        dto.setMovie(toMovieDto(userMovie.getMovie()));
        dto.setMusicScore(userMovie.getMusicScore());
        dto.setActingScore(userMovie.getActingScore());
        dto.setStoryScore(userMovie.getStoryScore());
        dto.setOverallScore(userMovie.getOverallScore());
        return dto;
    }

    private static MovieDto toMovieDto(Movie movie) {
        MovieDto dto = new MovieDto();
        dto.setId(movie.getId());
        dto.setTitle(movie.getTitle());
        dto.setBackdrop_path(movie.getBackdrop_path());
        dto.setPoster_path(movie.getPoster_path());
        dto.setRelease_date(movie.getRelease_date());
        dto.setVote_average(movie.getVote_average());
        dto.setVote_count(movie.getVote_count());
        return dto;
    }
}
