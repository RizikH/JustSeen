'use client';
import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/components/helpers/api';
import { MoviesResponse, Movie } from '@/types/types';
import { MovieScroller } from '@/components/MovieScroller/MovieScroller';

export default function TopRated() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const cacheKey = 'toprated-movies';
        const cacheTTL = 60 * 60 * 1000; // 1 hour
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
                    apiFetch<MoviesResponse>(`/movie/top_rated?page=${i + 1}`)
                );

                const responses = await Promise.all(pageRequests);
                const allResults = responses.flatMap(res => res.results);

                const uniqueMovies = allResults.filter(
                    (movie, index, self) =>
                        index === self.findIndex((m) => m.id === movie.id)
                );

                setMovies(uniqueMovies);
                sessionStorage.setItem(
                    cacheKey,
                    JSON.stringify({ data: uniqueMovies, timestamp: now })
                );
            } catch (err) {
                console.error('Error fetching top-rated movies:');
                setMovies([]);
            }
        };

        fetchMovies();
    }, []);

    return <MovieScroller movies={movies} />;
}
