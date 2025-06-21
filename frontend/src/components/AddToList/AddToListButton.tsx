"use client";

import { useState, useEffect, useRef } from "react";
import RatingPortal from "./AddToListPortal";
import { MovieDetails } from "@/types/types";
import { useAuthStore } from "@/components/stores/AuthStore/useAuthStore";
import { useIsMovieInList } from "@/components/hooks/useISInList";
import Rating from '@mui/material/Rating';
import axios from "axios";
import { Button } from "@/components/ui/button";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import success from '@/lottie/success.json'
import { UserMovie } from "@/types/types";

export default function AddToListButton({ movie }: { movie: MovieDetails }) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState("");
  const { user, isAuthenticated, loading } = useAuthStore();
  const isInList = useIsMovieInList(user?.id, movie.id);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [userMovie, setUserMovie] = useState<UserMovie | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(window.location.pathname);
    }
  }, []);

  const handleClick = () => {
    if (loading) return;

    if (isAuthenticated) {
      setOpen(true);
    } else {
      window.location.href = `/login?redirect=${encodeURIComponent(path)}`;
    }
  };

  useEffect(() => {
    const fetchRatedMovie = async () => {
      if (isInList) {
        const userMovie = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usermovies/user/${user?.id}/movie/${movie.id}`, { withCredentials: true });
        setUserMovie(userMovie.data);
      }
    };
    fetchRatedMovie();
  }, [isInList, user?.id, movie.id]);

  const handleAddToList = async () => {
    if (loading) return;

    if (isAuthenticated && user) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usermovies`, {
          user: { id: user.id },
          movie: {
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
            poster_path: movie.poster_path,
            overview: movie.overview,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            vote_count: movie.vote_count
          },
          musicScore: 0,
          actingScore: 0,
          storyScore: 0
        }, {
          withCredentials: true
        });

        if (lottieRef.current) {
          setShowAnimation(true);
          lottieRef.current.play();

          const rawDuration = lottieRef.current?.getDuration(false);
          const duration = (Number.isFinite(rawDuration) ? rawDuration! : 1.5) * 1000;

          setTimeout(() => {
            window.location.reload();
          }, duration + 1000);
        } else {
          window.location.reload();
        }
      } catch (err) {
        console.error("Failed to add movie:", err);
      }
    } else {
      window.location.href = `/login?redirect=${encodeURIComponent(path)}`;
    }
  };

  if (userMovie && userMovie.overallScore > 0) {
    return (
      <div className="flex flex-col gap-4">
        <Rating
          name="read-only-rating"
          value={userMovie.overallScore}
          precision={0.5}
          readOnly
        />
        <Button onClick={handleClick} disabled={loading} className="w-fit cursor-pointer">
          Edit Rating
        </Button>
        {open && isAuthenticated && (
          <RatingPortal movie={movie} onClose={() => setOpen(false)} />
        )}
      </div>
    );
  }

  if (!isInList) {
    return (
      <div className="flex flex-col gap-4">
        <h2>Seen it?</h2>
        <div className="flex flex-row gap-4 w-fit">
          <Button onClick={handleAddToList} disabled={loading} className="w-fit cursor-pointer">
            Add to List
          </Button>
          <Lottie
            animationData={success}
            loop={false}
            autoplay={false}
            className={`${showAnimation ? "inline" : "hidden"} w-9 h-9`}
            lottieRef={lottieRef}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2>Rate it and Brag about it.</h2>
      <Button onClick={handleClick} disabled={loading} className="w-fit cursor-pointer">
        Rate this Movie
      </Button>
      {open && isAuthenticated && (
        <RatingPortal movie={movie} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}
