import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth"; 
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice"; 
import { LOGO, profileAvatar } from "../utils/constants";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user);
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
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-44"
        src={LOGO}
        alt="logo" />
      {user && <div className="flex p-2">
        <img className="w-12 h-12"
        alt="usericon"
          src={profileAvatar}
        />
        <button 
        onClick={handleSignOut}
        className="font-bold text-white m-2">Sign out</button>
      </div>}
    </div>
  )
}

export default Header;