// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7RJD9Ks0FRkpAbgzvvw4fG8ketoazCpI",
  authDomain: "study-buddy-683fc.firebaseapp.com",
  projectId: "study-buddy-683fc",
  storageBucket: "study-buddy-683fc.firebasestorage.app",
  messagingSenderId: "252944934194",
  appId: "1:252944934194:web:0c6776ea40453dddd4a32b",
  measurementId: "G-B1PDYHG4F4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
const auth = getAuth(app); // Firebase Authentication
const db = getFirestore(app); // Firestore Database (if required)

// Export the services for use in your app
export { analytics, auth, db };
