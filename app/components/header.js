"use client"
import React from 'react'

import {FaSearch} from 'react-icons/fa';
import Link from 'next/link';
const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold text-sm sm:text-xl'>
      <span className='text-slate-500'>RentNow</span>
        </h1>
      <form  className='bg-slate-100 p-3 rounded-lg flex items-center'>
        <input type="text" placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64' />
             <button>
            <FaSearch className='text-slate-600' />
          </button>
        
      </form>
      <ul className='flex gap-4 items-center'>
      <Link href='/'> <li className='hidden sm:inline text-slate-700 hover:text-lg'>Home</li></Link>
        <Link href='/About'> <li className='hidden sm:inline text-slate-700 hover:text-lg'>About</li></Link>
        <Link href='/Profile'> <li className='hidden sm:inline text-slate-700 hover:text-lg'>Profile</li></Link>
        <Link href='/signup'> <li className='hidden sm:inline text-slate-700 hover:text-lg'>Login</li></Link>
      </ul>
    </div>
    </header>
  )
}

export default Header
