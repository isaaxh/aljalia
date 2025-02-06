import admin, { ServiceAccount } from "firebase-admin";
import { signInWithPhoneNumber } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase.client";

const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

const databaseURL = "https://metatron-blog.firebaseio.com";

export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL,
    });
  }

  return admin;
}

async function verifyIdToken(token: string) {
  if (!token) {
    throw new Error("No token provided");
  }
  return admin.auth().verifyIdToken(token);
}

async function signInUser(phoneNumber: string, otp: string) {
  const confirmationResult = await signInWithPhoneNumber(
    FIREBASE_AUTH,
    phoneNumber,
  );
  const userCredential = await confirmationResult.confirm(otp);

  const token = await userCredential.user.getIdToken();

  // Store token in a cookie
  document.cookie = `authToken=${token}; path=/;`;
}
const FIREBASE_ADMIN = getFirebaseAdmin();

const FIREBASE_DB = FIREBASE_ADMIN.firestore();

export { FIREBASE_ADMIN, FIREBASE_DB, verifyIdToken, signInUser };
