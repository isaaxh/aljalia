import "server-only";
/* import admin, { ServiceAccount } from "firebase-admin"; */
/**/
/* const serviceAccount: ServiceAccount = { */
/*   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, */
/*   clientEmail: process.env.FIREBASE_CLIENT_EMAIL, */
/*   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), */
/* }; */
/**/
/* export function getFirebaseAdmin() { */
/*   if (!admin.apps.length) { */
/*     admin.initializeApp({ */
/*       credential: admin.credential.cert(serviceAccount), */
/*     }); */
/*   } */
/**/
/*   return admin; */
/* } */
/**/
/* const FIREBASE_ADMIN = getFirebaseAdmin(); */
/**/
/* const FIREBASE_DB = FIREBASE_ADMIN.firestore(); */
/**/

import admin from "firebase-admin";

type firebaseAdminAppParams = {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
};

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

function createFirebaseAdminApp(params: firebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };

  return createFirebaseAdminApp(params);
}

export const testing = () => {
  console.log("fb.server testing function");
};

const verifyIdToken = async (token: string) => {
  try {
    console.log("verifyIdToken: ", token);
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

const FIREBASE_ADMIN = initAdmin();
const FIREBASE_DB = FIREBASE_ADMIN.firestore();

export { verifyIdToken };
