'use client';
import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/components/helpers/api';
import { MoviesResponse, Movie } from '@/types/types';
import styles from '@/styles/Home/home.module.scss';
import { MovieCard } from '@/components/MovieCard/MovieCard';

export default function Upcoming() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const movieListRef = React.useRef<HTMLDivElement>(null);

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
                setError(err as Error);
            }
        };

        fetchMovies();
    }, []);

    const handleLeftClick = () => {
        if (!movieListRef.current) return;
        const currentIndex = parseInt(getComputedStyle(movieListRef.current).getPropertyValue('--slider-index'));
        const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        movieListRef.current.style.setProperty('--slider-index', newIndex.toString());
    };

    const handleRightClick = () => {
        if (!movieListRef.current) return;
        const currentIndex = parseInt(getComputedStyle(movieListRef.current).getPropertyValue('--slider-index'));
        const maxIndex = movies ? Math.floor(movies.length / 6) - 1 : 0;
        const newIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
        movieListRef.current.style.setProperty('--slider-index', newIndex.toString());
    };

    return (
        <section id='upcoming-movies' className='listSection'>
            <button className="handle left-handle" onClick={handleLeftClick}>
                <div className="text text-5xl">&#8249;</div>
            </button>
            <div className='movieList' ref={movieListRef}>
                {movies && movies.length > 0 ? (
                    movies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>
            <button className="handle right-handle" onClick={handleRightClick}>
                <div className="text text-5xl">&#8250;</div>
            </button>
        </section>
    );
}
