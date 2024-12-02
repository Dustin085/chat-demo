// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "chatdemo-e04af.firebaseapp.com",
    projectId: "chatdemo-e04af",
    storageBucket: "chatdemo-e04af.firebasestorage.app",
    messagingSenderId: "1047909357471",
    appId: "1:1047909357471:web:166d878aad11efce97cfaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();