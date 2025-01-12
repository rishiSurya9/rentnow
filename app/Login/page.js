"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.PUBLIC_API}/api/auth/login`, 
        {
          method: 'POST',
          credentials: 'include', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setLoading(false);
        setError(data.message || 'An error occurred');
        return;
      }
      router.push('/');
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };



  const notify = (e)=>{
    e.preventDefault();
  toast.success('Login Successful!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    onClick: ()=>console.log('clicked'),
    theme: "light",
    });
  };


  return (
   <div onSubmit={handleSubmit} className='p-3 max-w-lg mx-auto my-5 bg-red-100 shadow-xl'>
      <h1 className='text-center font-bold text-2xl text-red-600'>Login</h1>
      <form className='flex flex-col gap-4 p-4'>
       
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
        <button onClick={notify} disabled={loading} className=' bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-90'>
        {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className='flex justify-center items-center gap-4'>
        <p>Don't have an account? <Link href='/signup' className='text-red-800 underline'>Signup</Link></p>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
};

export default page;
