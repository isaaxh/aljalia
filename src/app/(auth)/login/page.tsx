import PhoneNumberForm from "@/components/PhoneNumberForm";
import React from "react";

function LoginPage() {
  console.log("testing from loginpage");
  return (
    <div className="max-w-[1600px] flex flex-col flex-1 items-center justify-center">
      <PhoneNumberForm />
    </div>
  );
}

export default LoginPage;
