const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video md:pt-[15%] md:px-24 absolute text-white bg-gradient-to-r from-black">
        <h1 className=" text-2xl mt-16 md:text-5xl mx-8 font-bold md:w-1/2">{title}</h1>
        <p className=" hidden md:inline-block my-16 mx-8 text-xl w-1/2 h-auto font-mono">{overview}</p>
        <div className=" md:mx-8 mx-8 my-20 md:my-0 text-sm md:text-lg text-white">
            <button className="bg-white  md:mt-0 text-black py-2 px-4 rounded-md hover:bg-opacity-80">Play</button>
            <button className="ml-4 bg-white text-black py-2 px-4 rounded-md hover:bg-opacity-50">More Info</button>
        </div>
    </div>
  )
};

export default VideoTitle;