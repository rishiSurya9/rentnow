"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/auth/update`,
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
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src="https://picsum.photos/200"
          alt="profile"
          className="rounded-full mx-auto h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Username"
          id="username"
          className="border p-3 rounded-lg"
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
          className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-85"
          disabled={loading}
        >
<<<<<<< HEAD
        {Loading ? 'Loading...' : 'Updated'}
=======
          {loading ? "Updating..." : "Update"}
>>>>>>> 3c5aeca9a0a0e0933e73a6789f244daf71cd703d
        </button>
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
