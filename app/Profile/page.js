"use client";
import React, { useState } from "react";
import Link from "next/link";
const page = () => {
  const [formData, setFormData] = useState(0);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // console.log(formData);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);

  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.PUBLIC_API}/api/auth/update`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      if (res.status === 200) {
        router.push("/Login");
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex  flex-col gap-4">
        <img
          src="https://picsum.photos/200"
          alt="profile"
          className="rounded-full mx-auto h-24 w-24 objext-cover cursor-pointer self-center mt-2"
        />

        {/* <input onChange={handleChange} type='text' placeholder='Username' id='username' className='border p-3 rounded-lg' /> */}
        <label htmlFor="username">rest.username</label>

        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />

        <input
          onChange={handleChange}
          type="password"
          placeholder="Old password"
          id="oldPassword"
          className="border p-3 rounded-lg"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="New password"
          id="newPassword"
          className="border p-3 rounded-lg"
        />

        <button
          onClick={handleSubmit}
          className="bg-red-500 text-white p-3 rounded-lg  uppercase hover:opacity-90 disabled:opacity-85 "
        >
        {Loading ? 'Loading...' : 'Updated'}
        </button>
      </form>

      <div className="flex justify-between mt-4">
        <span className="text-sm text-gray-500 cursor-pointer font-bold">
          Delete Account
        </span>
        <Link href='/signup' className='text-red-800 underline'>
        <span className="text-sm text-gray-500 cursor-pointer font-bold">
          login
        </span>
        </Link>
      </div>
    </div>
  );
};

export default page;
