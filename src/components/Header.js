import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; 
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice"; 
import { toggleGptSearchView } from "../utils/gptSlice"
import { LOGO, SUPPORTED_LANG, profileAvatar } from "../utils/constants";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch);
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName} = user;
        dispatch(addUser({uid : uid, email : email, displayName : displayName}));
        navigate("/browse")
      } else {
        dispatch(removeUser());
        navigate("/");
      }
      return ()=> unsubscribe();
    });
  },[]);
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
    }).catch((error) => {
      navigate("/error");
    });
  }
  
  const handleGptSearchClick = ()=>{
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e)=>{
    dispatch(changeLanguage(e.target.value));
  }
  return (
    <div className=" px-6 py-2 bg-gradient-to-b from-black z-20 w-full flex flex-col md:flex-row justify-between absolute  ">
      <img className="w-44   mx-auto md:ml-0"
        src={LOGO}
        alt="logo" />
      {user && <div className="flex p-3">
        {showGptSearch && <select className="p-2 bg-gray-900 text-white m-2" onChange={handleLanguageChange}>
        {SUPPORTED_LANG.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
        </select>}
        <button className="text-white mx-auto md:mx-9 bg-red-600 rounded-md md:mr-4 px-5 py-2 my-6 md:my-0 md:px-7"
        onClick={handleGptSearchClick}
        >{showGptSearch ? "Homepage" : "GPT Search"}</button>
        <img className="hidden md:inline-block w-12 h-12 cursor-pointer"
        alt="usericon"
          src={profileAvatar}
        />
        <button 
        onClick={handleSignOut}
        className="font-bold text-white m-2">Sign out</button>
      </div>}
    </div>
  );
};

export default Header;