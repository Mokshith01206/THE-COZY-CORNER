// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBm3rXtOJoNbuwTmQZTd8mr6xIF1dv_z-M",
  authDomain: "the-cozy-corner-8b9e5.firebaseapp.com",
  projectId: "the-cozy-corner-8b9e5",
  storageBucket: "the-cozy-corner-8b9e5.firebasestorage.app",
  messagingSenderId: "432312890885",
  appId: "1:432312890885:web:b8e7697473f17b3b4b4e6c",
  measurementId: "G-P2P71P175L"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
