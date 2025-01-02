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
      {/* Header */}
      <header className='bg-red-700 shadow-md h-16 fixed top-0 left-0 w-full z-50'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <h1 className='font-bold text-sm sm:text-xl'>
            <span className='text-white text-2xl hover:text-gray-200 cursor-pointer'>RentNow</span>
          </h1>

          {/* Mobile Menu Icon */}
          <div
            onClick={ShowMenu}
            className='menu-icon sm:hidden text-4xl text-white ml-auto cursor-pointer'
          >
            <IoReorderThreeSharp />
          </div>

          {/* Menu Options */}
          <ul
            className={`MenuOption flex flex-col sm:flex-row gap-4 items-center sm:static fixed top-16 right-0 p-3 w-1/3 sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none transition-transform duration-300 ease-in-out ${menuVisible ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0 font-bold`}
          >
            <Link href='/Homee'>
              <li className='text-white hover:text-lg hover:text-red-800'>Home</li>
            </Link>
            <Link href='/About'>
              <li className='text-white hover:text-lg hover:text-red-800'>About</li>
            </Link>
            <Link href='/Profile'>
              <li className='text-white hover:text-lg hover:text-red-800'>Profile</li>
            </Link>
            <Link href='/signup'>
              <li className='text-white hover:text-lg hover:text-red-800'>Signup</li>
            </Link>
          </ul>
        </div>
      </header>

      {/* Page Content */}
      <main className='pt-16'>
        {/* Content goes here */}
      </main>
    </>
  );
};

export default Header;
