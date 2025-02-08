import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { FIREBASE_AUTH } from "./firebase.client";

const requestOtp = async (
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier,
): Promise<ConfirmationResult> => {
  try {
    const confirmationResult = await signInWithPhoneNumber(
      FIREBASE_AUTH,
      phoneNumber,
      recaptchaVerifier,
    );

    return confirmationResult;
  } catch (error: any) {
    throw new Error(
      error.code === "auth/invalid-phone-number"
        ? "Invalid phone number. Please check your number."
        : error.code === "auth/too-many-requests"
        ? "Too many requests. Please try again later."
        : "Failed to send OTP. Please try again.",
    );
  }
};

const verifyOtp = async (
  confirmationResult: ConfirmationResult,
  otp: string,
): Promise<void> => {
  try {
    await confirmationResult.confirm(otp);

    await storeUserToken(confirmationResult, otp);
  } catch (error) {
    throw new Error("Failed to verify OTP. Please check the OTP.");
  }
};

async function storeUserToken(
  confirmationResult: ConfirmationResult,
  otp: string,
) {
  const userCredential = await confirmationResult.confirm(otp);

  const token = await userCredential.user.getIdToken();

  // Store token in a cookie
  document.cookie = `authToken=${token}; path=/;`;
}

export { verifyOtp, requestOtp, storeUserToken };
