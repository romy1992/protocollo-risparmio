import "firebase/auth"; // se si utilizza l'autenticazione
import "firebase/firestore"; // se si utilizza il database Firestore
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALRfPY_cCJdhsCwS6EwTQn-lXMo6o4LAE",
  authDomain: "protocollorisparmio.firebaseapp.com",
  projectId: "protocollorisparmio",
  storageBucket: "protocollorisparmio.appspot.com",
  messagingSenderId: "296460273585",
  appId: "1:296460273585:web:52230035d8a8b05a90df90",
  measurementId: "G-N118ZFD9FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
