import "server-only";
import admin, { ServiceAccount } from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/auth";

const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const getFirebaseAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  return admin;
};

export const verifyIdToken = async (
  token: string,
): Promise<DecodedIdToken | null> => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

const FIREBASE_ADMIN = getFirebaseAdmin();

const FIREBASE_DB = FIREBASE_ADMIN.firestore();

console.log(FIREBASE_ADMIN.app.name);

export { FIREBASE_ADMIN, FIREBASE_DB };
