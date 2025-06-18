export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
}

export interface MovieDetails extends Movie {
    backdrop_path: string;
    genres: { id: number; name: string }[];
    runtime: number;
    videos: { results: Video[] };
    tagline?: string;
    homepage?: string;
    vote_count: number;
    production_companies: { name: string; logo_path?: string, id: number }[];
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
    published_at: string;
}

export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
