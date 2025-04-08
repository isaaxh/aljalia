import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function HomeBody() {
  return (
    <main className='flex flex-col flex-1 items-center justify-center sm:items-start'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-extrabold'>Welcome to Al Jalia</h1>
        <p className='text-base text-gray-600'>
          The Official website for Al Jalia Appointments
        </p>
      </div>
      <div>
        <Link href='/book-appointment'>
          <Button>Book Now</Button>
        </Link>
      </div>
    </main>
  );
}

export default HomeBody;
