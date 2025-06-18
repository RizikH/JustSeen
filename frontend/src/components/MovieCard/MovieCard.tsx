import React, { useRef } from 'react';
import Link from 'next/link';
import { Movie } from '@/types/types';

interface MovieCardProps {
    movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);

    return (
        <Link href={`/movie/${movie.id}`} className="movieCard" ref={cardRef}>
            {movie.poster_path ? (
                <img
                    src={`${process.env.NEXT_PUBLIC_APP_TMDB_IMAGE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                />
            ) : (
                <div className="placeholderPoster  flex flex-col w-full h-full justify-center items-center">
                    <span className="placeholderText">{movie.title}</span>
                    <span className="placeholderText">No Poster Available</span>
                </div>
            )}
        </Link>
    );
};
