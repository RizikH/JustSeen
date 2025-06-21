package com.example.backend.usermovie.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.example.backend.movie.model.Movie;
import com.example.backend.user.model.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_movies", uniqueConstraints = {
        @UniqueConstraint(columnNames = { "user_id", "movie_id" })
})
@Data
@NoArgsConstructor
public class UserMovie {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Movie movie;

    private float musicScore;
    private float actingScore;
    private float storyScore;
    private float overallScore;

    public UserMovie(User user, Movie movie, float musicScore, float actingScore, float storyScore) {
        this.user = user;
        this.movie = movie;
        this.musicScore = musicScore;
        this.actingScore = actingScore;
        this.storyScore = storyScore;
    }

}
