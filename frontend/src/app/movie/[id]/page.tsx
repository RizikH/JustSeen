import { apiFetch } from "@/components/helpers/api";
import { MovieDetails, Video } from "@/types/types";
import runtimeFormat from "@/components/helpers/runtimeFormat";
import { notFound } from "next/navigation";
import TrailerPortal from "@/components/TrailerPortal/TrailerPortal";
import { Suspense } from "react";
import styles from "@/styles/moviePage/moviePage.module.css";
import Similar from "@/components/Similar/Similar";
import Image from "next/image";

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const movieId = Number(id);
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
                    className='flex flex-col gap-6 w-full items-center justify-center overflow-hidden'
                >
                    <div
                        className={`w-full min-h-full flex flex-wrap md:flex-nowrap items-center justify-center gap-10 bg-black/75`}
                    >
                        {/* Movie Content */}
                        <div
                            className="flex flex-row items-center justify-center w-full"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieRes.backdrop_path})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className={`flex flex-row items-start justify-between w-full px-20 py-8 gap-6 ${styles.headerContainer}`}
                                style={
                                    {
                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    }
                                }
                            >
                                {/* Poster */}
                                <div className={`flex-shrink-0 w-[20rem] overflow-hidden rounded-lg shadow-lg ${styles.moviePoster}`}>
                                    {movieRes.poster_path ? (
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_APP_TMDB_IMAGE_URL}${movieRes.poster_path}`}
                                            alt={movieRes.title}
                                            width={500}
                                            height={750}
                                            className="w-full h-full object-cover rounded-lg shadow-md mt-8 md:mt-0"
                                            priority={false}
                                        />
                                    ) : (
                                        <div className="placeholderPoster  flex flex-col w-full h-full justify-center items-center">
                                            <span className="placeholderText">{movieRes.title}</span>
                                            <span className="placeholderText">No Poster Available</span>
                                        </div>
                                    )}
                                </div>

                                <div className={`flex flex-col gap-4 text-white max-w-full overflow-hidden ${styles.movieContent}`}>
                                    <h1 className="text-3xl font-bold">{movieRes.title}</h1>
                                    <p className="text-lg text-gray-300 italic">{movieRes.tagline}</p>
                                    <p className="text-base">{movieRes.overview}</p>

                                    <div className="flex flex-wrap gap-4 text-sm items-center">
                                        <span className="text-yellow-400 font-semibold">{movieRes.vote_average.toFixed(1)} / 10</span>
                                        <span className="text-gray-400">({movieRes.vote_count} votes)</span>
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
                                        <ul className="flex flex-wrap gap-5 mt-2 mb-2">
                                            {movieRes.production_companies.map((company) => (
                                                <li key={company.id} className="list-none">
                                                    {company.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cast Section */}
                    <div className={`w-full flex flex-col items-start justify-start gap-6 px-8 lg:px-20 py-4 ${styles.castContainer}`}>
                        <h2>Cast</h2>
                        <div className={`flex flex-col items-start justify-start w-full max-h-fit text-xl overflow-x-scroll  ${styles.castSection}`}>
                            <div className="flex flex-nowrap gap-8 my-4 min-w-max">
                                {cast && cast.length > 0 ? (
                                    cast.map((actor) => (
                                        <div key={actor.name} className={`flex flex-col items-center ${styles.castList}`}>
                                            {actor.profile_path ? (
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                                                    alt={actor.name}
                                                    className="w-24 h-36 object-cover rounded-lg shadow-md"
                                                    width={96}
                                                    height={144}
                                                    priority={false}
                                                />
                                            ) : (
                                                <div className="w-24 h-36 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
                                                    <span className="text-gray-500">No Image</span>
                                                </div>
                                            )}
                                            <span className="mt-2 text-sm text-center">{actor.name}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No cast information available</p>
                                )}
                            </div>

                        </div>
                    </div>
                    <div className={`w-full flex flex-col items-start justify-start gap-6 px-8 lg:px-20 py-4 ${styles.castContainer}`}>
                        <h2>Similar Movies</h2>
                        <div className={`flex flex-col items-start justify-start w-full max-h-fit text-xl overflow-x-scroll  ${styles.castSection}`}>
                            <div className="flex flex-nowrap gap-8 my-4 min-w-max">
                                <Similar movieId={movieId} />
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
