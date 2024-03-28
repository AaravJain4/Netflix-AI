import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

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
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="bg-Img" />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-90">
                <h1 className="text-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                    <input type="text" placeholder="Full Name" className="p-2 my-4 w-full bg-gray-700 border-gray-300 rounded-sm" />)}
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-4 w-full bg-gray-700 border-gray-300 rounded-sm" />
                <input ref={password} type="password" placeholder="Password" className="p-2 my-4 w-full bg-gray-700 rounded-sm" />
                <p className="text-red-500 font-bold py-2">{errorMessage}</p>
                <button className="p-4 my-4 bg-red-700 w-full rounded-lg"
                    onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up now." : "Already Regisered? Sign in now."}</p>
            </form>
        </div>
    )
}

export default Login;