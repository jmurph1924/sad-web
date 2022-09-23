// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCang0sSGGRqpieYCuiwdtLeaMIZe79VyA",
  authDomain: "instacount-app-domain.firebaseapp.com",
  projectId: "instacount-app-domain",
  storageBucket: "instacount-app-domain.appspot.com",
  messagingSenderId: "672047590717",
  appId: "1:672047590717:web:d46c05146821834515a954",
  measurementId: "G-DV7XLK61QR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseApp;