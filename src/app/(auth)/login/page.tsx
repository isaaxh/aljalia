"use client";

import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { ConfirmationResult, RecaptchaVerifier, signOut } from "firebase/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { FIREBASE_AUTH } from "@/lib/firebase.client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loadingSpinner";
import { Input } from "@/components/ui/input";
import { requestOtp, verifyOtp } from "@/lib/firebaseAuth";

function LoginPage() {
  const router = useRouter();
  const [presetNumber, setPresetNumber] = useState("+966502850922");

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

  useEffect(() => {
    if (otp.length === 6) {
      handleVerifyOtp();
    }
  }, [otp]);

  const handleRequestOtp = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    setResendCountdown(60);

    startTransition(async () => {
      setError("");

      if (!recaptchaVerifier) {
        return setError("RecaptchaVerifier is not initialized.");
      }

      try {
        const result = await requestOtp(phoneNumber, recaptchaVerifier);
        setConfirmationResult(result);

        setSuccess("OTP sent successfully.");
      } catch (error: any) {
        setError(error.message);
        setResendCountdown(0);
      }
    });
  };

  const handleVerifyOtp = async () => {
    startTransition(async () => {
      if (!confirmationResult) {
        setError("Please request OTP first.");
        return;
      }

      setError("");

      try {
        await verifyOtp(confirmationResult, otp);
        setSuccess("Login successful");
        router.replace("/dashboard");
      } catch (error) {
        setError("Failed to verify OTP. Please check the OTP.");
      }
    });
  };

  const addPresetNumber = () => {
    setPhoneNumber(presetNumber);
    console.log("addPresetNumber");
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      {!confirmationResult && (
        <form onSubmit={handleRequestOtp}>
          <Input
            className="text-black"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-2">
            Please enter your phone number with country code (i.e. +966 for SA)
          </p>
        </form>
      )}

      {confirmationResult && (
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={otp}
          onChange={(e) => setOtp(e)}
          autoFocus
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )}
      <Button
        type="submit"
        disabled={!phoneNumber || isPending || resendCountdown > 0}
        className="mt-5"
        onClick={() => handleRequestOtp()}
      >
        {resendCountdown > 0
          ? `Resend OTP in ${resendCountdown}`
          : isPending
          ? "Sending OTP"
          : "Send OTP"}
      </Button>

      <div className="p-10 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </div>

      {isPending && <LoadingSpinner />}

      <Button
        type="button"
        disabled={isPending || resendCountdown > 0}
        className="mt-5"
        onClick={() => addPresetNumber()}
      >
        Preset Number
      </Button>

      <div id="recaptcha-container" />
    </div>
  );
}

export default LoginPage;
