// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIRE_BASE_API ,
  authDomain: "rentnow-4c635.firebaseapp.com",
  projectId: "rentnow-4c635",
  storageBucket: "rentnow-4c635.firebasestorage.app",
  messagingSenderId: "736321085313",
  appId: "1:736321085313:web:4ab56f58f5d75c0dc7d280"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);