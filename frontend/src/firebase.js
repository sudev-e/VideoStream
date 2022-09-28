// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDR3P3XJjmEnKrjd0zN0ksobVBCoz4N0b0",
  authDomain: "videostream-604d3.firebaseapp.com",
  projectId: "videostream-604d3",
  storageBucket: "videostream-604d3.appspot.com",
  messagingSenderId: "430420949898",
  appId: "1:430420949898:web:89665948dc148921316673",
  measurementId: "G-8DP4BEXH98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const Provider = new GoogleAuthProvider();
export default app;