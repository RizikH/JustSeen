"use client";

import { useState } from "react";
import axios from "axios";
import { MovieDetails } from "@/types/types";

export default function RatingPortal({ movie, onClose }: { movie: MovieDetails; onClose: () => void }) {
  const [music, setMusic] = useState(0);
  const [acting, setActing] = useState(0);
  const [story, setStory] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`, {
        id: movie.id,
        title: movie.title,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        music_score: music,
        acting_score: acting,
        story_score: story
      });
      alert("Rating submitted!");
      onClose();
    } catch (err) {
      console.error("Error submitting rating", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rating-modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/60 z-50">
      <div className="bg-white p-6 rounded-md shadow-md text-black w-[90%] max-w-md">
        <h2 className="text-xl mb-4">Rate {movie.title}</h2>
        <div className="flex flex-col gap-3">
          <label>
            Music Score:
            <input type="number" min={0} max={10} value={music} onChange={(e) => setMusic(Number(e.target.value))} />
          </label>
          <label>
            Acting Score:
            <input type="number" min={0} max={10} value={acting} onChange={(e) => setActing(Number(e.target.value))} />
          </label>
          <label>
            Story Score:
            <input type="number" min={0} max={10} value={story} onChange={(e) => setStory(Number(e.target.value))} />
          </label>
        </div>
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-1 rounded">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            {submitting ? "Submitting..." : "Submit Rating"}
          </button>
        </div>
      </div>
    </div>
  );
}
