"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    toast.success('Information Updated!', {
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
    try {
      const res = await fetch(
        `${process.env.PUBLIC_API}/api/auth/update`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setLoading(false);
        setError(data.message || "An error occurred");
        return;
      }
      router.push("/");
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };


 

  return (
    <div className="p-3 max-w-lg mx-auto bg-red-100 shadow-xl rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-center my-7  text-red-600">Profile</h1>

      <form className="flex flex-col gap-4 ">
        <img
          src="https://picsum.photos/200"
          alt="profile"
          className="rounded-full mx-auto h-24 w-24 object-cover cursor-pointer self-center "
        />

        {/* <label htmlFor="username">Username</label> */}
        <input
          onChange={handleChange}
          type="text"
          placeholder="Username"
          id="username"
          className="border-black p-3 rounded-lg "
        />

        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
        />

        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        

        <button
          onClick={handleSubmit}
          className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-85"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}

        </button>
        {/* <button onClick={notify}>Show Toast</button> */}
      </form>

      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}

      <div className="flex justify-between mt-4">
        <span className="text-sm text-gray-500 cursor-pointer font-bold">
          Delete Account
        </span>
        <Link href="/signup">
          <span className="text-sm text-gray-500 cursor-pointer font-bold">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
