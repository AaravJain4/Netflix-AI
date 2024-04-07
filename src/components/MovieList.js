import MovieCard from "./MovieCard";
const MovieList = ({title, movies}) => {
  return (
    <div className="p-6 text-white ">
        <h1 className="md:text-3xl font-semibold p-5 text-2xl ">{title}</h1>
        <div className="flex p-5 flex-row overflow-x-scroll no-scrollbar ">
            <div className=" flex flex-row ">
                {movies?.map((movie)=>(<MovieCard key={movie.id} id={movie.id} posterPath={movie.poster_path} />))}
            </div>
        </div>
    </div>
  );
};

export default MovieList;