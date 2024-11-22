// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALbfrzAwi0AbQPrjBtq-KCmP2IEd5SnIA",
  authDomain: "muro-interactivo-kemylfb.firebaseapp.com",
  projectId: "muro-interactivo-kemylfb",
  storageBucket: "muro-interactivo-kemylfb.firebasestorage.app",
  messagingSenderId: "823113211001",
  appId: "1:823113211001:web:4b0874b2e4188de4f388a8",
  measurementId: "G-B7Q0JBVHXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;