"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetails } from "@/types/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Rating from '@mui/material/Rating';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Label } from "@/components/ui/label";
import { MagicCard } from "@/components/magicui/magic-card";
import { useAuthStore } from "@/components/stores/AuthStore/useAuthStore";

export default function RatingPortal({ movie, onClose }: { movie: MovieDetails; onClose: () => void }) {
  const [music, setMusic] = useState(0);
  const [acting, setActing] = useState(0);
  const [story, setStory] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showAbortConfirm, setShowAbortConfirm] = useState(false);
  const { user, isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackgroundClick = () => {
    setShowAbortConfirm(true); // show confirmation modal
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent background click
  };

  const confirmAbort = () => {
    onClose(); // actually close
  };

  const cancelAbort = () => {
    setShowAbortConfirm(false);
  };

  const handleSubmit = async () => {
    if (loading || !isAuthenticated || !user) return;

    setSubmitting(true);
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
        musicScore: music,
        actingScore: acting,
        storyScore: story
      }, {
        withCredentials: true
      });
      alert("Rating submitted!");
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Error submitting rating", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/60 z-50"
      onClick={handleBackgroundClick}
    >
      <Card
        className="p-0 w-full md:w-1/2 lg:w-1/3 shadow-none border-none bg-transparent px-8 md:px-0"
        onClick={handleContentClick}
      >
        <MagicCard gradientColor="#262626" className="p-0 dark bg-[#111] rounded-xl">
          <div className="p-4">
            <h2 className="text-white text-lg mb-2">Rate {movie.title}</h2>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label className="text-gray-300">Music</Label>
                <Rating
                  name="music-rating"
                  value={music}
                  onChange={(_, newValue) => setMusic(newValue ?? 0)}
                  icon={<MusicNoteIcon fontSize="inherit" />}
                  emptyIcon={<MusicNoteIcon fontSize="inherit" style={{ opacity: 0.3, color: "white" }} />}
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-300">Acting</Label>
                <Rating
                  name="acting-rating"
                  value={acting}
                  onChange={(_, newValue) => setActing(newValue ?? 0)}
                  icon={<TheaterComedyIcon fontSize="inherit" />}
                  emptyIcon={<TheaterComedyIcon fontSize="inherit" style={{ opacity: 0.3, color: "white" }} />}
                />
              </div>

              <div className="grid gap-2">
                <Label className="text-gray-300">Story</Label>
                <Rating
                  name="story-rating"
                  value={story}
                  onChange={(_, newValue) => setStory(newValue ?? 0)}
                  icon={<MenuBookIcon fontSize="inherit" />}
                  emptyIcon={<MenuBookIcon fontSize="inherit" style={{ opacity: 0.3, color: "white" }} />}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button className="cursor-pointer" variant="destructive" onClick={handleBackgroundClick} disabled={submitting}>Close</Button>
              <Button className="cursor-pointer" variant="link" onClick={handleSubmit} disabled={submitting || music === 0 || acting === 0 || story === 0}>
                {submitting ? "Submitting..." : "Submit Rating"}
              </Button>
            </div>
          </div>
        </MagicCard>
      </Card>


      {/* Confirmation Modal */}
      {showAbortConfirm && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-60"
          onClick={cancelAbort}
        >
          <Card className="p-0 w-full md:w-1/2 lg:w-1/3 shadow-none border-none bg-transparent px-8 md:px-0" onClick={(e) => e.stopPropagation()}>
            <MagicCard gradientColor="#262626" className="p-0 dark bg-[#111] rounded-xl">
              <div className="p-4">
                <h2 className="text-white text-lg mb-2">Are you sure you want to cancel?</h2>
                <p className="text-gray-400 mb-4">Your rating will not be saved.</p>
                <div className="flex justify-end space-x-2">
                  <Button className='cursor-pointer' variant="outline" onClick={cancelAbort}>Cancel</Button>
                  <Button className='cursor-pointer' variant="destructive" onClick={confirmAbort}>Close</Button>
                </div>
              </div>
            </MagicCard>
          </Card>
        </div>
      )}
    </div>
  );
}
