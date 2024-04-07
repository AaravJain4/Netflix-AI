import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openAI";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const langKey = useSelector((store)=>store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();
    const searchMovieTmdb = async (movie)=>{
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&page=1', API_OPTIONS);
        const json = await data.json();
        return json.results;
    }
    const handleGptSearchClick = async ()=>{
        const gptQuery = "Act as a movie recommendation system and suggest some movies for the query : "+ searchText.current.value + "only give me names of 5 movies, comma seperated like the example result given ahead. Example result: Gadar, Sholay, Don, Golmaal, Inception";
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',});
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        const promiseArray = gptMovies.map(movie=> searchMovieTmdb(movie));
        const tmdbResults = await Promise.all(promiseArray);
        dispatch(addGptMovieResult({movieNames : gptMovies, movieResults : tmdbResults}));
    };
  return (
    <div className="p-[15%] justify-center flex">
        <form className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg md:p-0" onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type="text" className="p-2 m-3 col-span-6 md:p-4 md:m-4 md:col-span-8 md:w-[95%] w-60 " placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className="ml-20  md:px-4 md:py-2 px-3 md:w-[85%] w-20  m-3 md:m-4 bg-red-600 text-white rounded-md  md:col-span-4 col"
            onClick={handleGptSearchClick}>
            {lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar;