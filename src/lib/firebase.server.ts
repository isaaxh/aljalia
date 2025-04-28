import "server-only";
import admin, { ServiceAccount } from "firebase-admin";
import { DecodedIdToken, getAuth } from "firebase-admin/auth";

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


// firebase util functions for firebase admin sdk 

export const verifyIdToken = async (
  token: string,
): Promise<DecodedIdToken | null> => {
  try {
    const auth = getAuth();
    return await auth.verifyIdToken(token);
  } catch (e) {
    console.error("Error verifying token.");
    throw new Error(`Error verifying token: ${e}`);
  }
};

export const setUserRole = async (uid: string, role: "admin" | "user") => {
  try {
    const auth = getAuth();
    const customClaims = {
      user: true,
      admin: role === "admin",
    }
    await auth.setCustomUserClaims(uid, customClaims);
    console.log(`Role ${role} assigned to user ${uid}`);
  } catch (e) {
    console.log(`Role ${role} assigned to user ${uid}`);
    throw new Error(`Error setting user role: ${e}`);
  }
};



export const verifyUserRole = async (
  token: string,
) => {
  try {
    const auth = getAuth();
    await auth.verifyIdToken(token).then((claims) => {
      if (claims.admin) {
        console.log('user is an admin', claims)
      }
    });
  } catch (e) {
    console.error("Error verifying user role.");
    throw new Error(`Error verifying user role: ${e}`);
  }
};

export const getExistingClaims = async (
  uid: string,
) => {
  // try {
  //   const auth = getAuth();
  //   await auth.getUser(uid)
  //     .then((userRecord) => {
  // The claims can be accessed on the user record.
  // console.log(userRecord.customClaims['admin']);
  //     });
  // } catch (e) {
  //   console.error("Error verifying user role.");
  //   throw new Error(`Error verifying user role: ${e}`);
  // }
};

