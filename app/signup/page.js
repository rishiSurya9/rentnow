"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const page = () => {
  const [formData,setFormData] = useState(0);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })

  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await fetch('/api/auth/signup', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log('User created successfully:', data);
  } else {
      console.error('Failed to create user:', response.statusText);
  }
}
  catch (error) {
    console.error('Error:', error);
  }
} 
  

  return (
    <div onSubmit={handleSubmit} className='p-3 max-w-lg mx-auto'>
     <h1 className='text-center font-bold text-2xl'>Signup</h1>
     <form className='flex flex-col gap-4 p-4'>
      <input type="text"  id="username" placeholder='Username' className='border-2 border-slate-500 rounded-lg p-2 'onChange={handleChange}/>
      <input type="email" id="email" placeholder='Email' className='border-2 border-slate-500 rounded-lg p-2'onChange={handleChange} />
      <input type="password" id="password" placeholder='Password' className='border-2 border-slate-500 rounded-lg p-2' onChange={handleChange}/>
      <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-90'>Signup</button>
     </form>
     <div className='flex justify-center items-center gap-4'>
      <p>Already have an account? <Link href='/Login' className='text-blue-800 underline' >Login</Link></p>
     </div>
    </div>
  )
}

export default page