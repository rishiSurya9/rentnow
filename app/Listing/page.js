import React, { useState } from "react";

function page() {
  const [listdata, setListData] = useState(0);
  const handleChange = (e) => {
    setListData({
      ...listdata,
      [e.target.id]: e.target.value,
    });
    console.log(listdata);
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
                <input className="p-3 border border-gray-300 rounded w-full " type="file" id="images" accept="image/*" multiple />
                <button className="p-3 text-green-800 border border-green-800 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
            </div>
        <button className="p-3 bg-green-800 text-white rounded-lg uppercase hover:shadow-lg">Create Listing</button>
        </div>

      </form>
    </main>
  );
}

export default page;
