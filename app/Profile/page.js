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
    id:currentUser?._id || " ",
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    oldPassword: "",
    newPassword: "",
  });
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Populate form data with the current user when the component mounts
    if (currentUser) {
      setFormData({
        id:currentUser._id,
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

  const deleteListing = async (listingId) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/listing/delete/${listingId}`, {
        method: "DELETE",
        credentials: "include",

        });
      const data = await res.json();

      if(!res.ok){
        setError(data.message || "An error occurred");
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }
  const getListing = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/listing/${currentUser._id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
     if(res.ok){
      console.log(data);
      setUserListings(data);
     }
     else {
      setShowListingsError(true);
     }
    } catch (error) {
      setShowListingsError(true);
    }
  };


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


  const handleDeleteUser = async ()=>{
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/delete/${currentUser._id}`,{
        method: "DELETE",
        credentials: "include",

        });
      const data = await res.json();

      if(!res.ok){
        setError(data.message || "An error occurred");
        return;
      }
      router.push("/");
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }

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

        <Link className=" bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-85 text-center" href="/Listing">
        create Listing
        </Link>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="flex justify-between mt-4">
        <span onClick={handleDeleteUser} className="text-sm text-gray-500 cursor-pointer font-bold">
          Delete Account
        </span>
        <Link href="/Login">
          <span className="text-sm text-gray-500 cursor-pointer font-bold">
            Login
          </span>
        </Link>
      </div>
      
     
        <button type="button" className="text-green-500 hover:opacity-95 max-w-full" onClick={getListing}>user Listings</button>
      <p className="text-red-500 text-center mt-4">{showListingsError ? 'Error fetching listings': ''}</p>

      {userListings && userListings.length > 0 &&
      <div className="flex flex-col gap-4">
        <h1 className="text-center my-7 font-semibold text-2xl">Your Listings</h1>
        {
       userListings.map((listing) => (
         <div key={listing._id} className="border rounded-lg flex justify-between mt-4 items-center gap-4">
          <Link href={`/Listing/${listing._id}`}>
          <img src={listing.imageUrls[0]} alt="listing cover" className="h-16 w-16 object-contain" />
          </Link>
          <Link href={`/listing/${listing._id}`} className="text-slate-700 text-sm font-semibold hover:underline truncate">
          <p >{listing.name}</p>
          </Link>
          <div className="flex flex-col gap-4 items-center">
            <button onClick={()=>deleteListing(listing._id)} className="text-red-800 hover:opacity-95 uppercase">Delete</button>
            <Link href={`/updateListing/${listing._id}`} passHref>
    <button className="text-green-800 hover:opacity-95 uppercase">Edit</button>
</Link>
          </div>
         </div>
       ))
      }
      </div>}
    </div>
  );
};

export default ProfilePage;
