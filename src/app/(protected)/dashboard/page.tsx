"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { useCheckAuth } from "@/hooks/useCheckAuth";
import Link from "next/link";
import { useGlobal } from "@/hooks/useGlobal";
import { getFunctions, httpsCallable } from "firebase/functions";

function Dashboard() {
  const { user, userData, logOut } = useAuth();
  const { decodedUser, loading } = useCheckAuth();
  const { adminList } = useGlobal();

  if (!loading && !decodedUser) {
    logOut();
  }

  const handleBtnClick = () => {
    const functions = getFunctions();
    const sayHello = httpsCallable(functions, "sayHello");

    sayHello()
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error("Error calling function:", error);
      });
  };

  return (
    <div className='flex flex-col flex-1 justify-center items-center'>
      <h1>Welcome to the dashboard</h1>
      <div>client user: {user?.uid}</div>
      <div>client name: {userData?.name}</div>
      <div>client email: {userData?.email}</div>
      <div>admin user uid: {decodedUser?.uid}</div>
      <div>admin user phone: {decodedUser?.phone_number}</div>
      {adminList.map((admin) => (
        <div key={admin.phoneNumber}>{admin.phoneNumber}</div>
      ))}
      <div className='flex gap-x-3'>
        <Link href='/appointments'>
          <Button>View Appointments</Button>
        </Link>

        <Link href='/book-appointment'>
          <Button>Book Appointment</Button>
        </Link>

        <Link href='/profile'>
          <Button>View Profile</Button>
        </Link>

        <Link href='/admin/'>
          <Button>Admin Dashboard</Button>
        </Link>

        <Link href='/admin/manage-appointments'>
          <Button>Manage Appointments</Button>
        </Link>
      </div>

      <Button className='mt-5' onClick={handleBtnClick}>
        Say Hello
      </Button>
      {user && (
        <Button className='mt-5' onClick={logOut}>
          Sign out
        </Button>
      )}
    </div>
  );
}

export default Dashboard;
