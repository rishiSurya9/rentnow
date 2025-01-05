import React from 'react'


const page = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile 
      </h1>

      <form className='flex  flex-col gap-4'>
        <img src='https://picsum.photos/200' alt='profile' className='rounded-full mx-auto h-24 w-24 objext-cover cursor-pointer self-center mt-2'/>

        <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg' />

        <input type='email' placeholder='email' id='email' className='border p-3 rounded-lg' />

        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg' />

        <button className='bg-red-500 text-white p-3 rounded-lg  uppercase hover:opacity-90 disabled:opacity-85 '>Submit</button>
      </form>

      <div className='flex justify-between mt-4'>
        <span className='text-sm text-gray-500 cursor-pointer font-bold'>
          Delete Account
        </span>

        <span className='text-sm text-gray-500 cursor-pointer font-bold'>
          Sign in
        </span>
      </div>
    </div>
  )
}

export default page
