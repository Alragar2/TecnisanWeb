import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHBrKc8aoW6TTanha_i_nIWOvIKMCPGMo",
  authDomain: "tecnisan-55e1e.firebaseapp.com",
  projectId: "tecnisan-55e1e",
  storageBucket: "tecnisan-55e1e.firebasestorage.app",
  messagingSenderId: "214167961385",
  appId: "1:214167961385:web:f63f862138a49dc5044138",
  measurementId: "G-11BE4SYFM5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
