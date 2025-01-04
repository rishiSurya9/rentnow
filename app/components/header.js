"use client";
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoReorderThreeSharp } from "react-icons/io5";
import Link from 'next/link';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const ShowMenu = () => {
    setMenuVisible(!menuVisible); // Toggle the menu visibility
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.MenuOption') && !e.target.closest('.menu-icon')) {
      setMenuVisible(false); // Hide the menu if clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className='bg-red-700 shadow-md '>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <h1 className='font-bold text-sm sm:text-xl'>
            <span className='text-white text-2xl hover:text-gray-200 cursor-pointer'>RentNow</span>
          </h1>

          <div
            onClick={ShowMenu}
            className='menu-icon sm:hidden text-4xl text-white ml-auto cursor-pointer'
          >
            <IoReorderThreeSharp />
          </div>

          <ul
         
            // className={`MenuOption flex flex-col sm:flex-row gap-4 items-center sm:static fixed top-16 right-0 p-3 w-1/3 sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none transition-transform duration-300 ease-in-out ${menuVisible ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0 font-bold md:text-white`}
            className={`MenuOption flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:static fixed top-16 right-0 p-3 w-2/3 sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none z-50 transition-transform duration-300 ease-in-out ${menuVisible ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0`}

          
          >
            <Link href='/'>
              <li className='md:text-white  hover:text-lg  hover:underline inline-block transition-all duration-300'>Home</li>
            </Link>
            <Link href='/About'>
              <li className='md:text-white hover:text-lg  hover:underline inline-block transition-all duration-300'>About</li>
            </Link>
            <Link href='/Profile'>
              <li className='md:text-white hover:text-lg  hover:underline inline-block transition-all duration-300'>Profile</li>
            </Link>
            <Link href='/signup'>
              <li className='md:text-white hover:text-lg  hover:underline inline-block transition-all duration-300'>Signup</li>
            </Link>
          </ul>
        </div>
      </header>

<<<<<<< HEAD
      {/* Page Content */}
      <main className='pt-16'>
       
      </main>
=======
      
>>>>>>> 66dbbff47ef8542cc9e6ba77baff330adbac3232
    </>
  );
};

export default Header;
