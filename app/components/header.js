'use client'; // Mark this component as a Client Component
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoReorderThreeSharp } from 'react-icons/io5';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Correct import for App Router

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); // Correct usage of useRouter

  const ShowMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.MenuOption') && !e.target.closest('.menu-icon')) {
      setMenuVisible(false);
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
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    // router.push(`/Search?${urlParams.toString()}`); // Correct usage of router.push
    router.push(`/Search?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [window.location.search]);

  return (
    <header className="bg-[rgb(1,169,182)] shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl">
          <Link href='/'>
            <span className="text-white text-2xl hover:text-gray-200 cursor-pointer">
              RentNow
            </span>
          </Link>
        </h1>

        <div
          onClick={ShowMenu}
          className="menu-icon sm:hidden text-4xl text-white ml-auto cursor-pointer"
        >
          <IoReorderThreeSharp />
        </div>

        <ul
          className={`MenuOption flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:static fixed top-16 right-0 p-3 w-2/3 sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none z-50 transition-transform duration-300 ease-in-out ${
            menuVisible ? 'translate-x-0' : 'translate-x-full'
          } sm:translate-x-0`}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-slate-100 p-2 rounded-lg flex "
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
            <li className="md:text-white hover:text-lg hover:underline inline-block transition-all duration-300">
              Home
            </li>
          </Link>
          <Link href="/About">
            <li className="md:text-white hover:text-lg hover:underline inline-block transition-all duration-300">
              About
            </li>
          </Link>
          <Link href="/Profile">
            <li className="md:text-white hover:text-lg hover:underline inline-block transition-all duration-300">
              Profile
            </li>
          </Link>
          <Link href="/signup">
            {currentUser ? (
              <img
                src={currentUser.avatar}
                alt="profile"
                className="rounded-full mx-auto h-7 w-7 object-cover cursor-pointer self-center"
              />
            ) : (
              <li className="md:text-white hover:text-lg hover:underline inline-block transition-all duration-300">
                Signup
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
