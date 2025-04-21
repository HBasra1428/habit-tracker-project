'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Learn from '../AboutUs/Learn';

const Splash: React.FC = () => {
  const router = useRouter();

  const handleSplashClick = () => {
    router.push('/Learn');
  };

  return (
    <div className="bg-gradient-to-br from-[#00e2a2] to-[#1f8bfe] p-6 rounded-2xl shadow-xl cursor-pointer">
      <h1 className="text-6xl text-white font-bold text-center">
        Welcome to the Habit Tracker!
      </h1>

      <nav className="flex flex-col md:flex-row justify-center items-center gap-6 mt-6 text-white">
        <p className="text-2xl md:text-4xl text-center md:text-left">
          Elevate your time management to the next level.
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, voluptatem, recusandae corporis neque, minima sint explicabo odio excepturi eaque tempora optio quod quo repellendus quaerat! Quia hic culpa autem dolores!
        </p>
        <img
          src="/write.png"
          width={200}
          height={200}
          alt="Writing icon"
          className="rounded-md"
        />
      </nav> 

      <div className="flex ml-40 mt-5">
        <button className="bg-white text-[#372cff] px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition duration-300" onClick={handleSplashClick}>
            <link rel="stylesheet" href="/Learn" />
            Learn more
        </button>

      </div>
    </div>
  );
};

export default Splash;
