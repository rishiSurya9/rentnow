"use client";
import React, { useState } from "react";

function page() {
  const [files , setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const handleImageSubmit = async  (e) => {
    if(files.length > 0 && files.length < 6){
      const promises = [];
      setUploading(true);
      for(let i = 0; i < files.length; i++){
        promises.push(uploadFile(files[i]));
      }
      try {
        const results = await Promise.all(promises);
        console.log("Uploaded images:", results); // Contains the URLs of uploaded images
        setUploading(false); // Hide loading
        alert("Images uploaded successfully!");
      } catch (error) {
        console.error("Error uploading images:", error);
        setUploading(false);
        alert("Error uploading images");
      }
    } else {
      alert("Please select between 1 to 6 images.");
    }
  };
  const uploadFile = async (file) => {  
     const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rent_places"); 
    formData.append("cloud_name", "dx5kkvi7t");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dx5kkvi7t/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.secure_url;
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      throw error; 
    }
  };
  const handleFileChange = (e) => {
    const fileArray = Array.from(e.target.files); 
    setFiles(fileArray);
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Create a Listing </h1>
      <form className="flex flex-col sm:flex-row gap-4" action="">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minleng="10"
            required
          />
          <textarea
            type="text"
            placeholder="description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="address"
            className="border p-3 rounded-lg"
            id="address"
            maxLength="62"
            minleng="10"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5 " />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5 " />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parkinng" className="w-5 " />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5 " />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5 " />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type='number'
                id="bedrooms"
                min='1'
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1" 
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <div className=" flex flex-col items-center">
                <p>Regular Price</p>
                <span>($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type='number'
                id="offerPrice"
                min='1'
                max="10"
                required
                className="p-2 border border-gray-300 rounded-lg"
              />
              <div className=" flex flex-col items-center">
                <p>Offer price</p>
                <span>($/month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold ">Images:
                <span className="font-normal text-gray-500 ml-2">The first image will be to the cover (max 6)</span>
            </p>

            <div className="flex gap-4">
                <input onChange={handleFileChange} className="p-3 border border-gray-300 rounded w-full " type="file" id="images" accept="image/*" multiple />
                <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-800 border border-green-800 rounded uppercase hover:shadow-lg disabled:opacity-80"
              disabled={uploading} // Disable button during upload
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
            </div>
        <button className="p-3 bg-green-800 text-white rounded-lg uppercase hover:shadow-lg">Create Listing</button>
        </div>

      </form>
    </main>
  );
}

export default page;
