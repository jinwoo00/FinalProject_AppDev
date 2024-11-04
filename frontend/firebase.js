// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIPrX0KhWY0VdaYEaIk4EVbi7O2eNVWaE",
  authDomain: "finalprojectbackend-26473.firebaseapp.com",
  projectId: "finalprojectbackend-26473",
  storageBucket: "finalprojectbackend-26473.firebasestorage.app",
  messagingSenderId: "724415439559",
  appId: "1:724415439559:web:a84fb52e52e177044394e2",
  measurementId: "G-92BX8Y0FLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);

export{ db };