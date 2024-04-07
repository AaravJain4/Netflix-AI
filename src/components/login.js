import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const email = useRef(null);
    const password = useRef(null);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;
        if (!isSignInForm) {
            //Sign Up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
        else {
            //Sign In
            signInWithEmailAndPassword(auth,email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: "name.current.value"
                      }).then(() => {
                        const {uid, email, displayName} = auth.currentUser;
                        dispatch(addUser({uid : uid, email : email, displayName : displayName}));
                      }).catch((error) => {
                        setErrorMessage(error.message);
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    }
    return (
        <div>
            <Header />
            <div>
                <img className="absolute bg-slate-500 h-screen object-cover w-full "
                src={BG_URL}
                    alt="bg-Img" />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="absolute bg-black md:py-4 py-16 px-5 m-32 md:w-[440px] mx-auto  right-0 left-0 text-white text-center rounded-md bg-opacity-80 w-[400px]">
                <h1 className="text-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                    <input type="text" placeholder="Full Name" className="p-3 px-5 my-4  w-full rounded-md bg-[#333333] text-gray-400'" />)}
                <input ref={email} type="text" placeholder="Email Address" className="p-3 px-5 my-3 w-full rounded-md bg-[#333333] text-gray-400" />
                <input ref={password} type="password" placeholder="Password" className="p-3 px-5 my-4  w-full rounded-md bg-[#333333] text-gray-400" />
                <p className="text-red-500 font-bold py-2">{errorMessage}</p>
                <button className="py-4 my-6 bg-red-700 w-full rounded-lg"
                    onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="cursor-pointer text-slate-400" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up now." : "Already Regisered? Sign in now."}</p>
            </form>
        </div>
    )
}

export default Login;