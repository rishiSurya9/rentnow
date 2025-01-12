"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message);
      } else if (res.status === 200) {
        router.push("/dashboard");
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Login</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          id="email"
          className="border p-3 rounded-lg"
          required
        />

        <input
          onChange={handleChange}
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-85"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="flex justify-between mt-4">
        <Link href="/forgot-password" className="text-red-800 underline">
          <span className="text-sm text-gray-500 cursor-pointer font-bold">
            Forgot Password?
          </span>
        </Link>
        <Link href="/signup" className="text-red-800 underline">
          <span className="text-sm text-gray-500 cursor-pointer font-bold">
            Sign Up
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;