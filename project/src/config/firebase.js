// firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth'; // Importa altri servizi Firebase se necessario

const firebaseConfig = {
    apiKey: "AIzaSyALRfPY_cCJdhsCwS6EwTQn-lXMo6o4LAE",
    authDomain: "protocollorisparmio.firebaseapp.com",
    projectId: "protocollorisparmio",
    databaseURL:"https://protocollorisparmio-default-rtdb.firebaseio.com/",
    storageBucket: "protocollorisparmio.appspot.com",
    messagingSenderId: "296460273585",
    appId: "1:296460273585:web:52230035d8a8b05a90df90",
    measurementId: "G-N118ZFD9FK"
};

const app = firebase.initializeApp(firebaseConfig);
const database = app.database(); // Inizializza il database

export default database;