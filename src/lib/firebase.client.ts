import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(clientCredentials);

// export auth and firestore
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);

const postsCollection = collection(FIREBASE_DB, "posts");
const commentsCollection = collection(FIREBASE_DB, "comments");
const usersCollection = collection(FIREBASE_DB, "users");

export {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_DB,
  postsCollection,
  commentsCollection,
  usersCollection,
};
