'use client';
import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/components/helpers/api';
import { MoviesResponse, Movie } from '@/types/types';
import styles from '@/styles/moviePage/moviePage.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface SimilarProps {
    movieId: number;
}

export default function Similar({ movieId }: SimilarProps) {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const cacheKey = `similar-movies-${movieId}`;
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
                    apiFetch<MoviesResponse>(`/movie/${movieId}/similar?language=en-US&page=${i + 1}`)
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
                console.error('Error fetching similar movies:');
                setMovies([]);
            }
        };

        fetchMovies();
    }, [movieId]);

    return (
        <div className="flex flex-nowrap gap-8 my-4 min-w-max">
            {movies && movies.length > 0 ? (
                movies.map((movie) => (
                    <Link href={`/movie/${movie.id}`} key={movie.id} className={`flex flex-col items-center ${styles.castList} hover:scale-105 transition-transform duration-250`}>
                        {movie.poster_path ? (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_APP_TMDB_IMAGE_URL}${movie.poster_path}`}
                                alt={movie.title}
                                className="w-24 h-36 object-cover rounded-lg shadow-md"
                                loading="lazy"
                                width={96}
                                height={144}
                            />
                        ) : (
                            <div className="w-24 h-36 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )}
                    </Link>
                ))
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No similar movies found.</p>
                </div>
            )}
        </div>
    );
}
