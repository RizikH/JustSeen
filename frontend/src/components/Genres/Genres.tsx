'use client';
import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/components/helpers/api';
import { MoviesResponse, Movie } from '@/types/types';
import { MovieCard } from '@/components/MovieCard/MovieCard';

interface GenresProps {
    genreId: number;
    genreName: string;
}

export default function Genres(GenresProps: GenresProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const movieListRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cacheKey = `genre-${GenresProps.genreId}`;
        const cached = sessionStorage.getItem(cacheKey);

        if (cached) {
            setMovies(JSON.parse(cached));
            return;
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
                const uniqueMovies = Array.from(new Map(allMovies.map(m => [m.id, m])).values());
                const shuffledMovies = uniqueMovies.sort(() => 0.5 - Math.random());

                sessionStorage.setItem(cacheKey, JSON.stringify(shuffledMovies));
                setMovies(shuffledMovies);
            } catch (err) {
                setError(err as Error);
            }
        };

        fetchMovies();
    }, [GenresProps.genreId]);


    const handleLeftClick = () => {
        if (!movieListRef.current) return;
        const currentIndex = parseInt(getComputedStyle(movieListRef.current).getPropertyValue('--slider-index'));
        const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        movieListRef.current.style.setProperty('--slider-index', newIndex.toString());
    }

    const handleRightClick = () => {
        if (!movieListRef.current) return;
        const currentIndex = parseInt(getComputedStyle(movieListRef.current).getPropertyValue('--slider-index'));
        const maxIndex = movies ? Math.floor(movies.length / 6) - 1 : 0;
        const newIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
        movieListRef.current.style.setProperty('--slider-index', newIndex.toString());
    }

    return (
        <section id={`${GenresProps.genreName.toLowerCase()}-movies`} className='listSection'>
            <button className="handle left-handle" onClick={handleLeftClick}>
                <div className="text text-5xl">&#8249;</div>
            </button>
            <div className='movieList' ref={movieListRef}>
                {movies && movies.length > 0 ? (
                    movies.map((movie: Movie) => (
                        <MovieCard key={`${GenresProps.genreId}-${movie.id}`} movie={movie} />
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
