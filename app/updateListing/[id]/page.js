"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

function page({params }) {
  const { currentUser } = useSelector((state) => state.user);
  const [files , setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = params;
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
  if(!pageInfo.offer) {
    pageInfo.discountPrice = pageInfo.regularPrice;
  }
  try {
    if (pageInfo.imageUrls.length === 0) {
      setError("Please upload at least 1 image.");
      return;
    }
    
    if (pageInfo.offer && +pageInfo.regularPrice <= +pageInfo.discountPrice) {
      setError("Regular price should be greater than discount price when an offer is applied.");
      return;
    }
    setLoading(true);
    setError(false);
   const res = await fetch(`${process.env.PUBLIC_API}/api/listing/update/${id}`, 
      {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...pageInfo,
          userRef: currentUser._id
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.log(data.message);
      setError(data.message);
    } else {
      setError(null);
      console.log(data);
      router.push(`/listing/${id}`);
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
const handleImageSubmit = async () => {
  const MAX_IMAGE_SIZE_MB = 2;
  const isValidSize = files.every((file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024);

  if (!isValidSize) {
    setImageUploadError(`Each image must be less than ${MAX_IMAGE_SIZE_MB}MB.`);
    setUploading(false);
    return;
  }

  if (files.length > 0 && files.length < 6) {
    setUploading(true);
    setImageUploadError(false);

    const promises = files.map(uploadFile);
    try {
      const results = await Promise.all(promises);
      setPageInfo((prevState) => ({
        ...prevState,
        imageUrls: [...prevState.imageUrls, ...results], 
      }));
      setUploading(false);
      alert("Images uploaded successfully!");
    } catch (error) {
      setImageUploadError("Image upload failed.");
      setUploading(false);
    }
  } else {
    setImageUploadError("You can only upload 6 images per listing.");
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
  const removeImage = (index) => () => {
    setPageInfo((prevState) => ({
      ...prevState,
      imageUrls: prevState.imageUrls.filter((_, i) => i !== index),
    }));
  };
  useEffect(() => {
    const fetchListing = async () => {
      const listingId = id;
      const res = await fetch(`${process.env.PUBLIC_API}/api/listing/get/${listingId}`);
      const data = await res.json();
      if (res.ok) {
       setPageInfo(data);
      } else {
        console.log(data.message);
      }
    };
    fetchListing();
  }, [id]);
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Update a Listing </h1>
      <form  onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4" action="">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="name"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="name"
            value={pageInfo.name}
            required
          />
          <textarea
            type="text"
            placeholder="description"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="description"
            value={pageInfo.description}
            required
          />
          <input
            type="text"
            placeholder="address"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="address"
            value={pageInfo.address}
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
  <input type="radio" id="sell" name="option" className="w-5" onChange={handleChange} checked={pageInfo.type === 'sell'} />
  <span>Sell</span>
</div>
<div className="flex gap-2">
  <input type="radio" id="rent" name="option" className="w-5" onChange={handleChange} checked={pageInfo.type === 'rent'} />
  <span>Rent</span>
</div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5 " onChange={handleChange} checked={pageInfo.parking} />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5 " onChange={handleChange} checked={pageInfo.furnished} />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5 " onChange={handleChange} checked={pageInfo.offer} />
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
                value={pageInfo.bedrooms}
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
                value={pageInfo.bathrooms}
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
                value={pageInfo.regularPrice}
                className="p-2 border border-gray-300 rounded-lg"
              />
              <div className=" flex flex-col items-center">
                <p>Regular Price</p>
                <span>($/month)</span>
              </div>
            </div>
            {pageInfo.offer && (
              <div className="flex items-center gap-2">
                <input
                  type='number'
                  id="discountPrice"
                  min="500" 
                  max="50000"
                  required
                  onChange={handleChange}
                    value={pageInfo.discountPrice}
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <div className=" flex flex-col items-center">
                  <p>Offer price</p>
                  <span>($/month)</span>
                </div>
              </div>
            )}
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
              disabled={uploading} 
            >
             {uploading ? 'uploading....' : "Upload Images"}
            </button>
            </div>
            <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
            {
              pageInfo.imageUrls.length > 0 && pageInfo.imageUrls.map((url, index) => (
               <div key={url} className="flex justify-between p-3 border items-center gap-2">
                <img src={url} alt="image" className="w-20 h-20 rounded-lg" />  
                <button type="button" onClick={removeImage(index)} className="p-3 text-red-600 uppercase hover:opacity-75 rounded-lg" >Remove</button>
                </div>
                ))
            }
         <button
            disabled={loading || uploading}
            className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          >
            {loading ? 'Creating...' : 'Update listing'}
          </button>
        {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>

      </form>
    </main>
  );
}

export default page;