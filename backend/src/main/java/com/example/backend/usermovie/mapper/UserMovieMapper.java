package com.example.backend.usermovie.mapper;

import com.example.backend.usermovie.dto.UserMovieDto;
import com.example.backend.usermovie.model.UserMovie;

public class UserMovieMapper {

    public static UserMovieDto toDto(UserMovie userMovie) {
        UserMovieDto dto = new UserMovieDto();
        dto.setId(userMovie.getId());
        dto.setUserId(userMovie.getUser().getId());
        dto.setMovieId(userMovie.getMovie().getId());
        return dto;
    }
}
