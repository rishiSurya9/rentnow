'use client';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoReorderThreeSharp } from 'react-icons/io5';
import Link from 'next/link';
import { IoIosNotifications } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  // const { user } = useSelector((state) => state.auth);
  const [menuVisible, setMenuVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <header className="bg-red-600 shadow-md ">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-white text-2xl hover:text-gray-200 cursor-pointer">
              RentNow
            </span>
          </h1>

          <div
            onClick={ShowMenu}
            className="menu-icon sm:hidden text-4xl text-white ml-auto cursor-pointer"
          >
            <IoReorderThreeSharp />
          </div>

          <ul
            // className={`MenuOption flex flex-col sm:flex-row gap-4 items-center sm:static fixed top-16 right-0 p-3 w-1/3 sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none transition-transform duration-300 ease-in-out ${menuVisible ? 'translate-x-0' : 'translate-x-full'} sm:translate-x-0 font-bold md:text-white`}
            className={`MenuOption flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:static fixed top-16 right-0 p-3 w-2/3 sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none z-50 transition-transform duration-300 ease-in-out ${
              menuVisible ? 'translate-x-0' : 'translate-x-full'
            } sm:translate-x-0`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-slate-100 p-2 rounded-lg flex items-center"
            >
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent focus:outline-none w-24 sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>
                <FaSearch className="text-slate-600" />
              </button>
            </form>
            <Link href="/">
              <li className="md:text-white  hover:text-lg  hover:underline inline-block transition-all duration-300">
                Home
              </li>
            </Link>
            <Link href="/About">
              <li className="md:text-white hover:text-lg  hover:underline inline-block transition-all duration-300">
                About
              </li>
            </Link>
            <Link href="/Profile">
              <li className="md:text-white hover:text-lg  hover:underline inline-block transition-all duration-300">
                Profile
              </li>
            </Link>

            <Link href="/signup">
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="rounded-full mx-auto h-7 w-7 object-cover cursor-pointer self-center "
                />
              ) : (
                <li className="md:text-white hover:text-lg  hover:underline inline-block transition-all duration-300">
                  Signup
                </li>
              )}
            </Link>
          </ul>
        </div>

        {/* <div  className='flex jstify-between items-center max-w-6xl mx-auto p-3  flex-1'>
          <div className='flex items-center gap-4 flex-1 justify-end'>
            <h2>all customer </h2>


            <input type="search" />

            <button className='text-red-600 font-bold text-sm '>Add customer</button>

            <div className='p-3 rounded-full w-9 items-center justify-center hover:bg-opacity-90 cursor-pointer'>< IoIosNotifications /> </div>

            <img className='w-14 h-14 rounded-full ' src="https://st.depositphotos.com/1594308/1372/i/950/depositphotos_13723344-stock-photo-employer.jpg" alt="" />
          </div>
        </div>
        
        {/* Page Content */}
      </header>
    </>
  );
};

export default Header;
