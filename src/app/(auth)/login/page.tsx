import { LoginInputForm } from "@/components/LoginInputForm";
import { PhoneInput } from "@/components/PhoneInput";
import React from "react";

function LoginPage() {
  return (
    <div className="max-w-[1600px] flex flex-col flex-1 items-center justify-center">
      <LoginInputForm />
      {/* <PhoneInput /> */}
    </div>
  );
}

export default LoginPage;
