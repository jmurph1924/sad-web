import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const app = initializeApp({
  apiKey: "AIzaSyCang0sSGGRqpieYCuiwdtLeaMIZe79VyA",
  authDomain: "instacount-app-domain.firebaseapp.com",
  databaseURL: "https://instacount-app-domain-default-rtdb.firebaseio.com",
  projectId: "instacount-app-domain",
  storageBucket: "instacount-app-domain.appspot.com",
  messagingSenderId: "672047590717",
  appId: "1:672047590717:web:d46c05146821834515a954",
  measurementId: "G-DV7XLK61QR"
});

export const auth = getAuth(app);
export const methods = {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}
export default app