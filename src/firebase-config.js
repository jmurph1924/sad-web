import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);