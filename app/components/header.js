'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoReorderThreeSharp } from 'react-icons/io5';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const menuRef = useRef(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Toggle menu visibility
  const toggleMenu = () => setMenuVisible((prev) => !prev);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const params = new URLSearchParams();
      params.set('searchTerm', searchTerm);
      router.push(`/search?${params.toString()}`);
    }
  };

  // Get search term from URL on page load
  useEffect(() => {
    setSearchTerm(searchParams.get('searchTerm') || '');
  }, [pathname, searchParams]);

  return (
    <header className="bg-red-600 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link href="/" className="text-white text-2xl font-bold hover:text-gray-200">
          RentNow
        </Link>

        {/* Menu Button (Mobile) */}
        <div onClick={toggleMenu} className="menu-icon sm:hidden text-4xl text-white ml-auto cursor-pointer">
          <IoReorderThreeSharp />
        </div>

        {/* Menu Options */}
        <ul
          ref={menuRef}
          className={`MenuOption flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:static fixed top-16 right-0 p-3 w-2/3 sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none z-50 transition-transform duration-300 ease-in-out ${
            menuVisible ? 'translate-x-0' : 'translate-x-full'
          } sm:translate-x-0`}
        >
          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="bg-slate-100 p-2 rounded-lg flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search"
            />
            <button aria-label="Search Button">
              <FaSearch className="text-slate-600" />
            </button>
          </form>

          {/* Navigation Links */}
          {['Home', 'About', 'Profile'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`}>
              <li className="md:text-white hover:text-lg hover:underline inline-block transition-all duration-300">
                {item}
              </li>
            </Link>
          ))}

          {/* Profile or Signup */}
          <Link href={currentUser ? '/profile' : '/signup'}>
            {currentUser ? (
              <Image
                src={currentUser.avatar}
                alt="User Profile"
                width={28}
                height={28}
                className="rounded-full object-cover cursor-pointer"
                priority
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
