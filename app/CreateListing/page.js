"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [pageInfo, setPageInfo] = useState({
    name: "",
    description: "",
    address: "",
   propertyType: "Flat",
   BHK: 1,
   rooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    type: "rent",
    parking: false,
    furnished: false,
    area: "",
    offer: false,
    imageUrls: [],
  });

  const notify = () => {
    toast.success("Image uploaded successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const errorNotify = () => {
    toast.warn("Reupload the image!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setPageInfo({
        ...pageInfo,
        type: e.target.id,
      });
    }
    if (e.target.id === "area" ) {
      setPageInfo({
        ...pageInfo,
        area: e.target.id,
      });
    }
    if (e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
      setPageInfo({
        ...pageInfo,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea") {
      setPageInfo({
        ...pageInfo,
        [e.target.id]: e.target.value,
      });
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("pageInfo", pageInfo);
    if (!pageInfo.offer) {
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
      const res = await fetch(`${process.env.PUBLIC_API}/api/listing/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...pageInfo,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        setError(null);
        router.push("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async () => {
    const MAX_IMAGE_SIZE_MB = 2;
    const isValidSize = files.every(
      (file) => file.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024
    );

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
        notify();
      } catch (error) {
        errorNotify();
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
      const response = await fetch(`https://api.cloudinary.com/v1_1/dx5kkvi7t/image/upload`, {
        method: "POST",
        body: formData,
      });

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

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-7">Create a Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="name"
            required
          />
          <textarea
            placeholder="Description"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="radio"
                id="sell"
                name="option"
                className="w-5"
                onChange={handleChange}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="rent"
                name="option"
                className="w-5"
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap">
          <div className="flex gap-2">
              <input
                type="radio"
                id="Flat"
                name="property"
                className="w-5"
                onChange={handleChange}
              />
              <span>Flat</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="House"
                name="property"
                className="w-5"
                onChange={handleChange}
              />
              <span>House</span>
            </div>
            </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="BHK"
                min="1"
                max="10"
                required
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>BHK</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="rooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-lg"
              />
              <p>Rooms</p>
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
                <span>(Rs/month)</span>
              </div>
            </div>
            {pageInfo.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="500"
                  max="50000"
                  required
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-lg"
                />
                <div className=" flex flex-col items-center">
                  <p>Offer price</p>
                  <span>(Rs/month)</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-6 flex-wrap">
          <div className="flex gap-2">
              <input
                type="radio"
                id="area"
                name="Area"
                className="w-5"
                onChange={handleChange}
              />
              <span>Educational Area</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                 id="area"
                name="Area"
                className="w-5"
                onChange={handleChange}
              />
              <span>Industrial Area</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                 id="area"
                name="Area"
                className="w-5"
                onChange={handleChange}
              />
              <span>IT Area</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="area"
                name="Area"
                className="w-5"
                onChange={handleChange}
              />
              <span>Residential Area</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                 id="area"
                name="Area"
                className="w-5"
                onChange={handleChange}
              />
              <span>Hospital Area</span>
            </div>
            </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          <div className="flex gap-4">
            <input
              onChange={handleFileChange}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-500 rounded-lg border bg-green-100"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-500 font-medium">{imageUploadError}</p>
          )}

          <div className="grid grid-cols-3 gap-4 mt-6">
            {pageInfo.imageUrls.length > 0 &&
              pageInfo.imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt="Image"
                    className="rounded-md shadow-lg w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage(index)}
                    className="absolute top-1 right-1 text-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="none"
                        d="M0 0h24v24H0z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 12h-4v4h-2v-4H7v-2h4V8h2v4h4v2z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
          </div>
          {error && (
            <p className="text-red-500 font-medium">{error}</p>
          )}
          <button
            className="p-4 bg-blue-600 text-white rounded-lg mt-6"
            type="submit"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default Page;
