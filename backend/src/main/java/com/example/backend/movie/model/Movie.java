package com.example.backend.movie.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data // Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor // Generates a no-args constructor
@Entity
@Table(name = "movies")
public class Movie {

    @Id
    private int id;
    private String title;
    private String backdrop_path;
    private String poster_path;
    private String overview;
    private String release_date;
    private double vote_average;
    private int vote_count;
    private float music_score;
    private float acting_score;
    private float story_score;
    private float overall_score;

    /**
     * Constructor for Movie class with essential values.
     *
     * @param id            Unique identifier for the movie.
     * @param title         Title of the movie.
     * @param backdrop_path Path to the movie's backdrop image.
     * @param poster_path   Path to the movie's poster image.
     * @param overview      Brief description of the movie.
     * @param release_date  Release date of the movie.
     * @param vote_average  Average rating of the movie.
     * @param vote_count    Number of votes received by the movie.
     */
    public Movie(int id, String title, String backdrop_path, String poster_path,
            String overview, String release_date, double vote_average, int vote_count) {
        this.id = id;
        this.title = title;
        this.backdrop_path = backdrop_path;
        this.poster_path = poster_path;
        this.overview = overview;
        this.release_date = release_date;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
    }

    /**
     * Constructor for Movie class with all values.
     *
     * @param id            Unique identifier for the movie.
     * @param title         Title of the movie.
     * @param backdrop_path Path to the movie's backdrop image.
     * @param poster_path   Path to the movie's poster image.
     * @param overview      Brief description of the movie.
     * @param release_date  Release date of the movie.
     * @param vote_average  Average rating of the movie.
     * @param vote_count    Number of votes received by the movie.
     * @param music_score   Score for the music in the movie.
     * @param acting_score  Score for the acting in the movie.
     * @param story_score   Score for the story in the movie.
     */
    public Movie(int id, String title, String backdrop_path, String poster_path,
            String overview, String release_date, double vote_average, int vote_count,
            float music_score, float acting_score, float story_score) {
        this.id = id;
        this.title = title;
        this.backdrop_path = backdrop_path;
        this.poster_path = poster_path;
        this.overview = overview;
        this.release_date = release_date;
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.music_score = music_score;
        this.acting_score = acting_score;
        this.story_score = story_score;
    }

}
