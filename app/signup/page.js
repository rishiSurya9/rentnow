"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { OAuth } from '../components/OAuth.js';

const page = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.PUBLIC_API}/api/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(data.message || 'An error occurred');
        return;
      }
      notify();
      router.push('/Login');
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const notify = () => {
    toast.success('Account Created Successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className='p-6 max-w-lg mx-auto my-10 bg-white shadow-xl rounded-lg'>
      <h1 className='text-center font-bold text-3xl text-[rgb(1,169,182)]'>Create Your Account</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-6'>
        <input
          type="text"
          id="username"
          placeholder='Username'
          className='border-2 border-[rgb(1,169,182)] rounded-lg p-3 focus:border-[rgb(1,130,140)] outline-none'
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder='Email'
          className='border-2 border-[rgb(1,169,182)] rounded-lg p-3 focus:border-[rgb(1,130,140)] outline-none'
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder='Password'
          className='border-2 border-[rgb(1,169,182)] rounded-lg p-3 focus:border-[rgb(1,130,140)] outline-none'
          onChange={handleChange}
        />
        <button disabled={loading} type="submit" className='bg-[rgb(1,169,182)] hover:bg-[rgb(1,130,140)] text-white font-bold py-3 px-5 rounded-lg disabled:opacity-70 transition-all'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <OAuth />
      <div className='flex justify-center items-center gap-4 mt-4'>
        <p className='text-gray-700'>Already have an account? 
          <Link href='/Login' className='text-[rgb(1,169,182)] font-semibold hover:underline'>Login</Link>
        </p>
      </div>
      {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
    </div>
  );
};

export default page;
