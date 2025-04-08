"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import Link from "next/link";

function Dashboard() {
  const { user, logOut } = useAuth();
  const { decodedUser, loading } = useCheckAuth();

  if (!loading && !decodedUser) {
    logOut();
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h1>Welcome to the dashboard</h1>
      <div>client user: {user?.uid}</div>
      <div>admin user uid: {decodedUser?.uid}</div>
      <div>admin user phone: {decodedUser?.phone_number}</div>
      <div className="flex gap-x-3">
        <Link href="/appointments">
          <Button>View Appointments</Button>
        </Link>

        <Link href="/book-appointment">
          <Button>Book Appointment</Button>
        </Link>

        <Link href="/profile">
          <Button>View Profile</Button>
        </Link>

        <Link href="/admin/">
          <Button>Admin Dashboard</Button>
        </Link>

        <Link href="/admin/manage-appointments">
          <Button>Manage Appointments</Button>
        </Link>
      </div>
      {user && (
        <Button className="mt-5" onClick={logOut}>
          Sign out
        </Button>
      )}
    </div>
  );
}

export default Dashboard;
