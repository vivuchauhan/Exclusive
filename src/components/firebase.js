// src/components/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFjG_bQBep5uwxHMNBfighddqvC4VRukw",
  authDomain: "add-to-cart-331f9.firebaseapp.com",
  projectId: "add-to-cart-331f9",
  storageBucket: "add-to-cart-331f9.appspot.com",
  messagingSenderId: "791631730594",
  appId: "1:791631730594:web:7c2afa4da4d61e185504fb",
  measurementId: "G-RZ6828G3QK",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, db, googleProvider };
