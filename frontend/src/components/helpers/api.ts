// api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_TMDB_API_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_APP_TMDB_API_KEY as string;

interface ApiOptions extends RequestInit {}

export async function apiFetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const defaultHeaders = {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    };

    const config: RequestInit = {
        method: 'GET',
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
        },
        ...options,
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return res.json() as Promise<T>;
}
