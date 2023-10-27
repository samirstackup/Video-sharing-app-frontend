import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl_1sB7KDVpJIt4cgON8XlMUNGOnC2tyc",
  authDomain: "video-a8c95.firebaseapp.com",
  projectId: "video-a8c95",
  storageBucket: "video-a8c95.appspot.com",
  messagingSenderId: "566238168942",
  appId: "1:566238168942:web:e56bc14978169abdbd237f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(); //exporting function
export const provider = new GoogleAuthProvider(); //provides the google button

export default app; //exporting the app from above
