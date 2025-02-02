/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const testingFirstFuction = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("this is from the structuredData off!");
});

export const helloWorldTest = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("this is the new message 2!");
});

export const toYouTube = onRequest((request, response) => {
  logger.info("hello logs toYouTube", { structuredData: true });
  console.log("hello from toYouTube");
  response.redirect("https://www.youtube.com");
});
