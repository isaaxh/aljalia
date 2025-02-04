"use client";
import HomeBody from "@/components/HomeBody";
import HomeFooter from "@/components/HomeFooter";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState();
  const isAuthenticated = true;

  if (!isAuthenticated) {
    redirect("/login"); // Redirect users to login if not authenticated
  }

  return <h1>Welcome to the App</h1>;
}
