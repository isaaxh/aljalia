import React from "react";
import Image from "next/image";

function HomeFooter() {
  return (
    <footer className='py-4 px-6 row-start-3 flex gap-6 flex-wrap items-center justify-center'>
      <a
        className='flex items-center gap-2 hover:underline hover:underline-offset-4'
        href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Image
          aria-hidden
          src='/file.svg'
          alt='File icon'
          width={16}
          height={16}
        />
        Learn
      </a>
      <a
        className='flex items-center gap-2 hover:underline hover:underline-offset-4'
        href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Image
          aria-hidden
          src='/window.svg'
          alt='Window icon'
          width={16}
          height={16}
        />
        Examples
      </a>
      <a
        className='flex items-center gap-2 hover:underline hover:underline-offset-4'
        href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Image
          aria-hidden
          src='/globe.svg'
          alt='Globe icon'
          width={16}
          height={16}
        />
        Go to nextjs.org →
      </a>
      <a
        className='flex items-center gap-2 hover:underline hover:underline-offset-4'
        href='/dashboard'
      >
        <Image
          aria-hidden
          src='/globe.svg'
          alt='Globe icon'
          width={16}
          height={16}
        />
        Go to dashboard →
      </a>
    </footer>
  );
}

export default HomeFooter;
