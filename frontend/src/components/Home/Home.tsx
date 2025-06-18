import TrendingMovies from './Trending/TrendingMovies';
import TopRated from './TopRated/TopRated';
import Upcoming from './Upcoming/Upcoming';
import Genres from '@/components/Genres/Genres';
import styles from '@/styles/Home/home.module.scss';


const GenresList = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
];

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
                    <div className="w-full flex overflow-x-auto">
                        <div className={styles.movieList}>
                            <Genres genreId={genre.id} genreName={genre.name}/>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}
