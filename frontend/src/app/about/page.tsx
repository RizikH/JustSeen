'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MagicCard } from "@/components/magicui/magic-card";

export default function About() {
  return (
    <div className="min-h-(--page-height) w-screen flex items-center justify-center bg-black text-white px-4 py-12">
      <Card className="p-0 w-full md:w-2/3 lg:w-1/2 shadow-none border-none bg-transparent px-8 md:px-0">
        <MagicCard gradientColor="#262626" className="p-0 dark bg-[#111] rounded-xl">
          <CardHeader className="border-b border-[#2a2a2a] p-4 pb-2">
            <CardTitle className="text-white text-3xl">About JustSeen</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 text-gray-300">
            <p>
              JustSeen is a full-stack movie discovery platform designed to deliver a clean, intuitive experience for browsing and rating movies.
            </p>
            <p>
              The backend is powered by Spring Boot, chosen to refresh my knowledge of the Java ecosystem and take advantage of its robust structure, scalability, and security.
            </p>
            <p>
              The app integrates with TMDB to fetch accurate movie data and allows users to register, log in, and save movies to a personal list with multi-category ratings.
            </p>
            <p>
              Future updates will include private note-taking (AES-128 encrypted), AI-powered movie suggestions, and public comment sections.
            </p>
          </CardContent>
        </MagicCard>
      </Card>
    </div>
  );
}
