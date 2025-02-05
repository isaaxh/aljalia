"use client";

import React, { FormEvent, useEffect, useState, useTransition } from "react";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Button } from "./ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import PhoneNumberForm from "./PhoneNumberForm";
import { FIREBASE_AUTH } from "@/lib/firebase.client";

function OtpLogin() {
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  const [recaptchaVerifier, setRecaptchaVerifier] =
    useState<RecaptchaVerifier | null>(null);

  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      FIREBASE_AUTH,
      "recaptcha-container",
      {
        size: "invisible",
      },
    );

    setRecaptchaVerifier(recaptchaVerifier);

    return () => {
      recaptchaVerifier.clear();
    };
  }, [FIREBASE_AUTH]);

  return (
    <>
      <h1>Testing otp input</h1>

      {!confirmationResult && <PhoneNumberForm />}

      {/* <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}> */}
      {/*   <InputOTPGroup> */}
      {/*     <InputOTPSlot index={0} /> */}
      {/*     <InputOTPSlot index={1} /> */}
      {/*     <InputOTPSlot index={2} /> */}
      {/*   </InputOTPGroup> */}
      {/*   <InputOTPSeparator /> */}
      {/*   <InputOTPGroup> */}
      {/*     <InputOTPSlot index={3} /> */}
      {/*     <InputOTPSlot index={4} /> */}
      {/*     <InputOTPSlot index={5} /> */}
      {/*   </InputOTPGroup> */}
      {/* </InputOTP> */}
      {/**/}
      {/* <Button>Submit</Button> */}

      <div id="recaptcha-container" />
    </>
  );
}

export default OtpLogin;
