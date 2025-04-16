import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Use environment variables with fallback to hardcoded values
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "beers-app-28713.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "370199420362",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:370199420362:web:71f4ac0c696090c4bf8333",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-G318XHRLVT"
};

// Log a warning if using hardcoded values in production
if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.warn('Warning: Using hardcoded Firebase configuration in production environment');
    }
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
