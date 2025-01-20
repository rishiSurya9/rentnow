"use client";
import React, { useState } from "react";

function page() {
  const [files , setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [pageInfo, setPageInfo] = useState({
    name: "",
    description: "",
    address: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    type:'rent',
    parking: false,
    furnished: false,
    offer: false,
    imageUrls: [],
  });

  const handleChange = (e) => {
    if (e.target.id === 'sell' || e.target.id === 'rent') {
      setPageInfo({
        ...pageInfo,
        type: e.target.id,
      });
    }
  
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setPageInfo({
        ...pageInfo,
        [e.target.id]: e.target.checked,
      });
    }
  
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setPageInfo({
        ...pageInfo,
        [e.target.id]: e.target.value,
      });
    }
  };
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${process.env.PUBLIC_API}/api/listing/create`, 
      {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageInfo),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
  const handleImageSubmit = async (e) => {
    if (files.length > 0 && files.length < 6) {
        const promises = [];
        setUploading(true);
        for (let i = 0; i < files.length; i++) {
            promises.push(uploadFile(files[i]));
        }
        try {
            const results = await Promise.all(promises);
            setPageInfo({
              ...pageInfo,
              imageUrls: results // Update imageUrls in pageInfo state
            })
            console.log(pageInfo.imageUrl); // Log the image URLs
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
  const removeImage = (index) => {
    return () => {
      const newArray = [...pageInfo.imageUrls];
      newArray.splice(index, 1);
      setPageInfo((prevState) => ({
        ...prevState,
        imageUrls: newArray,
      }));
    };
  };
  
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Create a Listing </h1>
      <form className="flex flex-col sm:flex-row gap-4" action="">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="name"
            required
          />
          <textarea
            type="text"
            placeholder="description"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="address"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
  <input type="radio" id="sell" name="option" className="w-5" onChange={handleChange} />
  <span>Sell</span>
</div>
<div className="flex gap-2">
  <input type="radio" id="rent" name="option" className="w-5" onChange={handleChange} />
  <span>Rent</span>
</div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5 " onChange={handleChange} />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5 " onChange={handleChange} />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5 " onChange={handleChange} />
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
                onChange={handleChange}
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
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="500" 
                max="50000"
                required
                onChange={handleChange}
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
                id="discountPrice"
              min="500" 
                max="50000"
                required
                onChange={handleChange}
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
            {
              pageInfo.imageUrls.length > 0 && pageInfo.imageUrls.map((url, index) => (
               <div key={url} className="flex justify-between p-3 border items-center gap-2">
                <img src={url} alt="image" className="w-20 h-20 rounded-lg" />  
                <button type="button" onClick={removeImage(index)} className="p-3 text-red-600 uppercase hover:opacity-75 rounded-lg" >Remove</button>
                </div>
                ))
            }
        <button onClick={handleSubmit} type="submit" className="p-3 bg-green-800 text-white rounded-lg uppercase hover:shadow-lg">Create Listing</button>
        </div>

      </form>
    </main>
  );
}

export default page;