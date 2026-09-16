// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "cotexai-ce60f.firebaseapp.com",
    projectId: "cotexai-ce60f",
    storageBucket: "cotexai-ce60f.firebasestorage.app",
    messagingSenderId: "355620458390",
    appId: "1:355620458390:web:42d7af4bdc0cc983c057b7",
    measurementId: "G-E99SCBPER9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()