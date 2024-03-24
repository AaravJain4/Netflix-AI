import { useState } from "react";
import Header from "./Header";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="bg-Img" />
            </div>
            <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-90">
                <h1 className="text-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                <input type="text" placeholder="Full Name" className="p-2 my-4 w-full bg-gray-700 border-gray-300 rounded-sm" />)}
                <input type="text" placeholder="Email Address" className="p-2 my-4 w-full bg-gray-700 border-gray-300 rounded-sm" />
                <input type="password" placeholder="Password" className="p-2 my-4 w-full bg-gray-700 rounded-sm" />
                <button className="p-4 my-4 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up now." : "Already Regisered? Sign in now."}</p>
            </form>
        </div>
    )
}

export default Login;