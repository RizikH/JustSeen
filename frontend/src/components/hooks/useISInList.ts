// hooks/useIsMovieInList.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UUID } from 'crypto';

export function useIsMovieInList(userId?: UUID, movieId?: number) {
    const [isInList, setIsInList] = useState<boolean | null>(null);

    useEffect(() => {
        if (!userId || !movieId) return;

        const fetch = async () => {
            try {
                const movie = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/usermovies/user/${userId}/movie/${movieId}`,
                    {
                        withCredentials: true,
                        headers: {
                            'Cache-Control': 'no-cache'
                        }
                    }
                );

                if (movie.data) {
                    setIsInList(true);
                } else {
                    setIsInList(false);
                }
            } catch {
                setIsInList(false);
            }
        };

        fetch();
    }, [userId, movieId]);

    return isInList;
}
