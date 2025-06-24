'use client';
import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/components/helpers/api';
import { MoviesResponse, Movie } from '@/types/types';
import { MovieScroller } from '@/components/MovieScroller/MovieScroller';

export default function Trending() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const cacheKey = 'trending-movies';
        const cacheTTL = 60 * 60 * 1000;
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
                    apiFetch<MoviesResponse>(`/trending/movie/day?page=${i + 1}`)
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
                console.error('Error fetching trending movies:');
                setMovies([]);
            }
        };

        fetchMovies();
    }, []);

    return <MovieScroller movies={movies} />;
}
