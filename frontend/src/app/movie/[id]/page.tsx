// NO "use client"
import { apiFetch } from "@/components/helpers/api";
import { MovieDetails, Video } from "@/types/types";
import runtimeFormat from "@/components/helpers/runtimeFormat";
import { notFound } from "next/navigation";
import TrailerPortal from "@/components/TrailerPortal/TrailerPortal";
import { Suspense } from "react";
import styles from "@/styles/moviePage/moviePage.module.css";

export default async function MoviePage({ params }: { params: { id: string } }) {
    const movieId = Number(params.id);
    if (isNaN(movieId)) return notFound();

    try {
        const [videoRes, movieRes] = await Promise.all([
            apiFetch<{ results: Video[] }>(`/movie/${movieId}/videos?language=en-US`),
            apiFetch<MovieDetails>(`/movie/${movieId}?language=en-US`)
        ]);

        const trailer = videoRes.results.find(
            (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        const castRes = await apiFetch<{ cast: { name: string; profile_path: string }[] }>(
            `/movie/${movieId}/credits?language=en-US`
        );
        const cast = castRes.cast.slice(0, 15);

        return (
            <>
                <div
                    className="w-screen min-h-[31rem] flex items-center justify-center"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieRes.backdrop_path})`,
                        backgroundSize: "cover",
                    }}
                >
                    <div className="w-full min-h-[100vh] flex flex-wrap md:flex-nowrap items-center justify-start gap-10 bg-black/75"
                        style={{ paddingLeft: '7rem', paddingRight: '7rem' }}
                    >

                        {/* Fixed-size poster */}
                        <div className={`flex-shrink-0 w-[20rem] overflow-hidden rounded-lg shadow-lg ${styles.moviePoster}`}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movieRes.poster_path}`}
                                alt={movieRes.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Movie content */}
                        <div className="flex flex-col gap-4 text-white">
                            <h1 className="text-3xl font-bold">{movieRes.title}</h1>
                            <p className="text-lg text-gray-300 italic">{movieRes.tagline}</p>
                            <p className="text-base">{movieRes.overview}</p>

                            <div className="flex flex-wrap gap-4 text-sm items-center">
                                <span className="text-yellow-400 font-semibold">
                                    {movieRes.vote_average.toFixed(1)} / 10
                                </span>
                                <span className="text-gray-400">
                                    ({movieRes.vote_count} votes)
                                </span>
                                <span className="text-gray-400">
                                    Runtime: <span className="text-white">{runtimeFormat(movieRes.runtime)}</span>
                                </span>
                            </div>

                            {trailer ? (
                                <Suspense fallback={<p>Loading trailer...</p>}>
                                    <TrailerPortal trailerKey={trailer.key} />
                                </Suspense>
                            ) : (
                                <p className="text-white">No trailer available</p>
                            )}

                            <div>
                                <h2 className="text-gray-300">Production Companies</h2>
                                <ul className="flex flex-wrap gap-5"
                                    style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
                                >
                                    {movieRes.production_companies.map((company) => (
                                        <li key={company.id} className="text-gray-300 list-none">
                                            {company.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } catch (err) {
        console.error("Failed to fetch movie data", err);
        return notFound();
    }
}
