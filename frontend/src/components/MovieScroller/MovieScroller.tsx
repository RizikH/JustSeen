'use client';
import React, { useRef } from 'react';
import { Movie } from '@/types/types';
import { MovieCard } from '@/components/MovieCard/MovieCard';
import { useIsMobile } from '@/components/IsMobile/IsMobile';
import styles from '@/styles/moviePage/moviePage.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface MovieScrollerProps {
    movies: Movie[];
}

export const MovieScroller: React.FC<MovieScrollerProps> = ({ movies }) => {
    const isMobile = useIsMobile();
    const movieListRef = useRef<HTMLDivElement>(null);

    const handleLeftClick = () => {
        if (!movieListRef.current) return;
        const currentIndex = parseInt(getComputedStyle(movieListRef.current).getPropertyValue('--slider-index'));
        const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        movieListRef.current.style.setProperty('--slider-index', newIndex.toString());
    };

    const handleRightClick = () => {
        if (!movieListRef.current) return;
        const currentIndex = parseInt(getComputedStyle(movieListRef.current).getPropertyValue('--slider-index'));
        const maxIndex = movies ? Math.floor(movies.length / 6) - 2 : 0;
        const newIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
        movieListRef.current.style.setProperty('--slider-index', newIndex.toString());
    };

    if (isMobile) {
        return (
            <div className={`w-full flex flex-col items-start justify-start gap-6 px-8 lg:px-28 ${styles.castContainer}`}>
                <div className={`flex flex-col items-start justify-start w-full max-h-fit text-xl overflow-x-scroll ${styles.castSection}`}>
                    <div className="flex flex-nowrap gap-8 my-4 min-w-max">
                        {movies.length > 0 ? (
                            movies.map((movie) => (
                                <Link
                                    href={`/movie/${movie.id}`}
                                    key={movie.id}
                                    className={`flex flex-col items-center ${styles.castList} hover:scale-105 transition-transform duration-250`}
                                >
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
                                            <span className="text-gray-500">{movie.title || 'No Image'}</span>
                                        </div>
                                    )}
                                </Link>
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">No movies found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="listSection">
            <div className="scrollWrapper">
                <button className="handle left-handle" onClick={handleLeftClick}>
                    <div className="text text-5xl">&#8249;</div>
                </button>
                <div className="movieList" ref={movieListRef}>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
                <button className="handle right-handle" onClick={handleRightClick}>
                    <div className="text text-5xl">&#8250;</div>
                </button>
            </div>
        </section>
    );
};
