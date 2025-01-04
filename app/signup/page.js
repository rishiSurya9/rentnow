"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const [formData, setFormData] = useState(0);
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
      const res = await fetch(`${process.env.PUBLIC_API}/api/auth/signup`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      else{
      setLoading(false);
      setError(null);
     router.push('/Login');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div onSubmit={handleSubmit} className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-bold text-2xl text-red-600'>Signup</h1>
      <form className='flex flex-col gap-4 p-4'>
        <input
          type="text"
          id="username"
          placeholder='Username'
          className='border-2 border-red-500 rounded-lg p-2 focus:border-red-600'
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder='Email'
          className='border-2 border-red-500 rounded-lg p-2 focus:border-red-600'
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder='Password'
          className='border-2 border-red-500 rounded-lg p-2 focus:border-red-600'
          onChange={handleChange}
        />
        <button disabled={loading} className=' bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-90'>
        {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex justify-center items-center gap-4'>
        <p>Already have an account? <Link href='/Login' className='text-red-800 underline'>Login</Link></p>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
};

export default page;
