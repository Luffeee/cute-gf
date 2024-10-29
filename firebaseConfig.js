import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDHFLIWNcEEwO_drapqr3SnrUe1rofV5J4",
    authDomain: "cute-gf.firebaseapp.com",
    projectId: "cute-gf",
    storageBucket: "cute-gf.appspot.com",
    messagingSenderId: "1010425923885",
    appId: "1:1010425923885:web:2b922fc5f96454a6e8aba4",
    measurementId: "G-ZVS3JL9RVP"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
