import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "dotenv/config";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_AUTH_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_AUTH_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_AUTH_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_AUTH_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
