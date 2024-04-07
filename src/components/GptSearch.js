import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
    return (
        <>
        <div className="absolute -z-10">
                <img className="fixed h-screen md:w-screen object-cover" src={BG_URL}
                    alt="bg-Img" />
        </div>
        <div className="pt-[35%] md:pt-[0%]"> 
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
        </>
    )
}

export default GptSearch;