"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

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
      const res = await fetch(`${process.env.PUBLIC_API}/api/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setLoading(false);
        setError(data.message || 'An error occurred');
        return;
      }
      notify(); // Call notify without an event
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

  // const handleGoogleLogin= (e)=>{
  //   e.preventDefault()
  //   console.log("handle Google login successfully")
  // }

  return (
    <div onSubmit={handleSubmit} className='p-3 max-w-lg mx-auto mt-8 bg-red-100  shadow-xl '>
      <h1 className='text-center font-bold text-3xl text-red-600   '>Create Your Account</h1>
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
        <button  disabled={loading} className=' bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-90'>
        {loading ? 'Loading...' : 'Sign Up'}
        </button>

       
  {/* <button className='flex items-center gap-2 bg-white text-black hover:bg-gray-100 font-bold py-2 px-4 rounded-lg disabled:opacity-90 justify-center flex-1'>
    <svg className='w-7 h-auto' width="800px" height="800px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/></svg>
    <span className=''>Signup with Google</span>
  </button> */}


      </form>
      <div className='flex justify-center items-center gap-4'>
        <p>Already have an account? <Link href='/Login' className='text-red-800 underline'>Login</Link></p>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
};

export default page;
