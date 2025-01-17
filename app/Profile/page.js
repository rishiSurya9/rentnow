"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"; // Import to access the Redux state
import { useRef,fileRef } from "react";

const ProfilePage = () => {
  // Access the current user from Redux state
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    id:currentUser?.id || "",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Populate form data with the current user when the component mounts
    if (currentUser) {
      setFormData({
        id:currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        oldPassword: "", // Reset oldPassword and newPassword
        newPassword: "",
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const notify = () =>{
    toast.success("Information Updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      onClick: () => console.log("clicked"),
      theme: "light",
    });
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/user/update/${currentUser._id}`,
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
      notify();
      router.push("/");
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const fileRef = useRef(null);
  return (
    <div className="p-3 max-w-lg mx-auto bg-red-100 shadow-xl rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-center my-7 text-red-600">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file"  ref={fileRef} hidden accept="image/*"/>
        <img
          onClick={() => fileRef.current.click()}
          src= {formData.avatar}
          alt="profile"
          className="rounded-full mx-auto h-24 w-24 object-cover cursor-pointer self-center "
        />

        <input
          onChange={handleChange}
          type="text"
          placeholder="Username"
          id="username"
          value={formData.username} // Set value to the current username
          className="border-black p-3 rounded-lg"
        />

        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email} // Set value to the current email
          className="border p-3 rounded-lg"
        />

        <input
          onChange={handleChange}
          type="password"
          placeholder="Old password"
          id="oldPassword"
          value={formData.oldPassword} // Set value to the old password
          className="border p-3 rounded-lg"
        />

        <input
          onChange={handleChange}
          type="password"
          placeholder="New password"
          id="newPassword"
          value={formData.newPassword} // Set value to the new password
          className="border p-3 rounded-lg"
        />

        <button
          
          className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-85"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="flex justify-between mt-4">
        <span className="text-sm text-gray-500 cursor-pointer font-bold">
          Delete Account
        </span>
        <Link href="/Login">
          <span className="text-sm text-gray-500 cursor-pointer font-bold">
            Login
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
