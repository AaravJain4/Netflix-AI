import { useState, useEffect } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";
const MovieCard = ({posterPath, id}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [trailerid,setTrailerId]=useState(null);
    const getMovieVideos= async()=>{
      const data= await fetch("https://api.themoviedb.org/3/movie/"+id+"/videos?language=en-US",API_OPTIONS);
      const json=await data.json();
      const filterData=json?.results.filter(video=>video.type==="Trailer")
      const trailer=filterData.length ? filterData[0] : json.results[0];
      setTrailerId(trailer?.key) 
    }
    useEffect(()=>{
      getMovieVideos();
    },[]);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    const imageStyle = {
      transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Enlarge on hover
      transition: 'transform 0.3s ease-in-out', // Smooth transition effect
    };
  
    return (
      <div
       
        className=" w-40 pr-5 md:w-60 md:pr-5 movie-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={"https://www.youtube.com/watch?v="+ trailerid}>
          <img
            src={IMG_CDN_URL + posterPath}
            alt="Movie Poster"
            style={imageStyle}
            className="poster-image rounded-lg"
          />
        </Link>
      </div>
    );
  };

export default MovieCard;