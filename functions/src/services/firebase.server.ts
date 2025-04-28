import "server-only";
import admin, { ServiceAccount } from "firebase-admin";

// firebase admin sdk initialization

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


const FIREBASE_ADMIN = getFirebaseAdmin();

const FIREBASE_DB = FIREBASE_ADMIN.firestore();

export { FIREBASE_ADMIN, FIREBASE_DB };