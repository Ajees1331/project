// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPHuy4NPsMZ6IFpXNlz7D6ORDkncb1SHU",
  authDomain: "financely-3df28.firebaseapp.com",
  projectId: "financely-3df28",
  storageBucket: "financely-3df28.firebasestorage.app",
  messagingSenderId: "141235915450",
  appId: "1:141235915450:web:512dabca08d748da06d083",
  measurementId: "G-FY50PFKJY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Remove Analytics if you're not using it
// const analytics = getAnalytics(app);

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export Firebase services and functions
export { db, auth, provider, doc, setDoc };
