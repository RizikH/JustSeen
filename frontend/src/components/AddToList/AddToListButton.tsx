"use client";

import { useState } from "react";
import RatingPortal from "./AddToListPortal"; // you'll make this next
import { MovieDetails } from "@/types/types";

export default function AddToListButton({ movie }: { movie: MovieDetails }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Rate this Movie
      </button>
      {open && <RatingPortal movie={movie} onClose={() => setOpen(false)} />}
    </>
  );
}
