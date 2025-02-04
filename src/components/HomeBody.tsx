import React from "react";
import OtpLogin from "./OtpLogin";
import Image from "next/image";

function HomeBody() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <OtpLogin />
    </main>
  );
}

export default HomeBody;
