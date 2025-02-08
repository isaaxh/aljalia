"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { FIREBASE_AUTH } from "@/lib/firebase.client";
import { signOut } from "firebase/auth";
import React from "react";

function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h1>Welcome to the dashboard</h1>
      <div>user uid: {user?.uid}</div>
      {user && (
        <Button className="mt-5" onClick={() => signOut(FIREBASE_AUTH)}>
          Sign out
        </Button>
      )}
    </div>
  );
}

export default Dashboard;
