import TrendingMovies from '@/components/Trending/TrendingMovies';
import TopRated from '@/components/TopRated/TopRated';
import Upcoming from '@/components/Upcoming/Upcoming'
import Genres from '@/components/Genres/Genres';
import styles from '@/styles/Home/home.module.css';
import { GenresList } from '@/data/db';

export default function Home() {
    return (
        <div id='home' className={styles.homeContainer}>
            <div className='w-full flex flex-col items-start justify-center'>
                <h3>Trending Movies</h3>
                <TrendingMovies />
            </div>
            <div className='w-full flex flex-col items-start justify-center'>
                <h3>Top Rated Movies</h3>
                <TopRated />
            </div>
            <div className='w-full flex flex-col items-start justify-center'>
                <h3>Upcoming Movies</h3>
                <Upcoming />
            </div>

            {GenresList.map((genre) => (
                <div key={genre.id} className="w-full flex flex-col items-start justify-center">
                    <h3>{genre.name} Movies</h3>
                    <Genres genreId={genre.id} genreName={genre.name} />
                </div>
            ))}

        </div>
    );
}
