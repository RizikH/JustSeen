'use client';
import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/components/helpers/api';
import { MoviesResponse, Movie } from '@/types/types';
import { MovieScroller } from '@/components/MovieScroller/MovieScroller';

export default function Upcoming() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const cacheKey = 'upcoming-movies';
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
                    apiFetch<MoviesResponse>(`/movie/upcoming?page=${i + 1}`)
                );

                const responses = await Promise.all(pageRequests);
                const allMovies = responses.flatMap(res => res.results);

                setMovies(allMovies);
                sessionStorage.setItem(
                    cacheKey,
                    JSON.stringify({ data: allMovies, timestamp: now })
                );
            } catch (err) {
                console.error('Error fetching upcoming movies:');
                setMovies([]);
            }
        };

        fetchMovies();
    }, []);

   return <MovieScroller movies={movies} />
}
