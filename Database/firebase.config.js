import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvIsrBeg28pZrK7KNfkYG36VxZx7himAc",
  authDomain: "developerblogreact.firebaseapp.com",
  projectId: "developerblogreact",
  storageBucket: "developerblogreact.firebasestorage.app",
  messagingSenderId: "492873906560",
  appId: "1:492873906560:web:23057752daff988f662965"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app); 
export {db, auth};