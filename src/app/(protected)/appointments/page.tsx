"use client";

import { useAuth } from "@/hooks/useAuth";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import React from "react";

function Appointments() {
  const { logOut } = useAuth();
  const { decodedUser, loading } = useCheckAuth();

  if (!loading && !decodedUser) {
    logOut();
  }
  return <div>Appointments</div>;
}

export default Appointments;
