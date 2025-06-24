'use client';
import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/components/helpers/api';
import { MoviesResponse, Movie } from '@/types/types';
import { MovieScroller } from '@/components/MovieScroller/MovieScroller';

interface GenresProps {
    genreId: number;
    genreName: string;
}

export default function Genres(GenresProps: GenresProps) {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const cacheKey = `genre-${GenresProps.genreId}`;
        const cacheTTL = 60 * 60 * 1000; // 1 hour in milliseconds
        const now = Date.now();

        const cachedData = sessionStorage.getItem(cacheKey);
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            if (now - timestamp < cacheTTL) {
                setMovies(data);
                return;
            }
        }

        const fetchMovies = async () => {
            try {
                const totalPages = 3;
                const pageRequests = Array.from({ length: totalPages }, (_, i) =>
                    apiFetch<MoviesResponse>(
                        `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${i + 1}&with_genres=${GenresProps.genreId}`
                    )
                );

                const responses = await Promise.all(pageRequests);
                const allMovies = responses.flatMap(res => res.results);

                const uniqueMovies = allMovies.filter(
                    (movie, index, self) =>
                        index === self.findIndex((m) => m.id === movie.id)
                );

                setMovies(uniqueMovies);
                sessionStorage.setItem(
                    cacheKey,
                    JSON.stringify({ data: uniqueMovies, timestamp: now })
                );

            } catch (err) {
                console.error('Error fetching movies:');
                setMovies([]);
            }
        };

        fetchMovies();
    }, [GenresProps.genreId]);

    return <MovieScroller movies={movies} />
}

