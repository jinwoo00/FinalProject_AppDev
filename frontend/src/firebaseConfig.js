// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import for authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSUFCnlMEvz5bG0M5pVVccgsOr0MB6uMY",
  authDomain: "naujanmunicipalhigh-school.firebaseapp.com",
  projectId: "naujanmunicipalhigh-school",
  storageBucket: "naujanmunicipalhigh-school.firebasestorage.app",
  messagingSenderId: "680818173352",
  appId: "1:680818173352:web:88f19e93b1de7f3250299d",
  measurementId: "G-3E5MF7JQ3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize Firebase Authentication

export { db, auth }; // Export both Firestore and Authentication
