"use client"
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoReorderThreeSharp } from "react-icons/io5";
import Link from 'next/link';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const ShowMenu = () => {
    setMenuVisible(!menuVisible); // Toggle the menu visibility
  };

  return (
    <>
      {/* Header */}
      <header className='bg-slate-300 shadow-md h-16 fixed top-0 left-0 w-full z-50'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <h1 className='font-bold text-sm sm:text-xl'>
            <span className='text-slate-800 text-2xl'>RentNow</span>
          </h1>

          {/* Mobile Menu Icon */}
          <div
            onClick={ShowMenu}
            className='sm:hidden text-4xl text-slate-800 ml-auto cursor-pointer'
          >
            <IoReorderThreeSharp />
          </div>

          {/* Menu Options */}
          <ul
            className={`MenuOption flex flex-col sm:flex-row gap-4 items-center sm:static fixed top-16 right-0 p-3 w-1/3 sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none transition-transform duration-300 ease-in-out ${
              menuVisible ? 'translate-x-0' : 'translate-x-full'
            } sm:translate-x-0`}
          >
            <Link href='/'><li className='text-slate-700 hover:text-lg'>Home</li></Link>
            <Link href='/About'><li className='text-slate-700 hover:text-lg'>About</li></Link>
            <Link href='/Profile'><li className='text-slate-700 hover:text-lg'>Profile</li></Link>
            <Link href='/signup'><li className='text-slate-700 hover:text-lg'>Signup</li></Link>
          </ul>
        </div>
      </header>

      {/* Page Content */}
      <main className='pt-16'>
        {/* Ensure enough padding to avoid overlap with the fixed header */}
        
      </main>
    </>
  );
};

export default Header;
