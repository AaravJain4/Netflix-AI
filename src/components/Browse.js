import Header from "./Header";
import useNowplayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
const Browse = () => {
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch);
  useNowplayingMovies();
  usePopularMovies();
  return (
    <div>
      <Header />
      {
        showGptSearch ? (<GptSearch />) : (<><MainContainer />
        <SecondaryContainer /></>)
      }
    </div>
  )
}

export default Browse;