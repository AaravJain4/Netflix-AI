import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const SecondaryContainer = () => {
  const movies = useSelector((store)=>store.movies);
  return (
    movies && (
    <div className="bg-black">
    <div className="-mt-32 relative pl-6 z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Horror"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
    )
  );
};
export default SecondaryContainer;