// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUWAXI7UPnjFGIfu0i9J93S8SEFKS_wbA",
  authDomain: "netflixai-9336e.firebaseapp.com",
  projectId: "netflixai-9336e",
  storageBucket: "netflixai-9336e.appspot.com",
  messagingSenderId: "518183634422",
  appId: "1:518183634422:web:7fd97c55a1a35e9445b3d7",
  measurementId: "G-FGHB0VQWC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();