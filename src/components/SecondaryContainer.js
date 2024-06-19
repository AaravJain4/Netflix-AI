import { useSelector } from "react-redux";
import MovieList from "./MovieList";
const SecondaryContainer = () => {
  const movies = useSelector((store)=>store.movies);
  return (
    movies && (
    <div className="bg-black">
    <div className="md:-mt-32 mt-0 relative md:pl-6 md:z-20 z-10">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRated} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
      </div>
    </div>
    )
  );
};
export default SecondaryContainer;