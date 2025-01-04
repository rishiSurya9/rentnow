"use client";
import React, { useState } from "react";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Cozy 2BHK Apartment",
      location: "Downtown",
      price: "$1200/month",
      image: "/property1.jpg",
    },
    {
      id: 2,
      title: "Spacious 3BHK Villa",
      location: "Green Valley",
      price: "$2500/month",
      image: "/property2.jpg",
    },
  ]);

  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
  });

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const addProperty = () => {
    setProperties([...properties, { ...newProperty, id: properties.length + 1 }]);
    setNewProperty({ title: "", location: "", price: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-red-100 text-gray-900">
      {/* Header */}
      <header className="bg-red-30 py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-white  mb-4 md:mb-0 ">Search Your Home</h1>
          <div className="flex items-center w-full md:w-auto">
            <input
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600 transition"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add Property Section */}
        <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Add a New Property</h2>
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={newProperty.title}
            onChange={handleInputChange}
            className="w-full mb-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newProperty.location}
            onChange={handleInputChange}
            className="w-full mb-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={newProperty.price}
            onChange={handleInputChange}
            className="w-full mb-2 px-4 py-2 bg-gray-100 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="file"
            name="image"
            onChange={(e) =>
              setNewProperty({ ...newProperty, image: e.target.files[0].name })
            }
            className="w-full mb-4 text-gray-400"
          />
          <button
            onClick={addProperty}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
          >
            Add Property
          </button>
        </section>

        {/* Properties Listing */}
        <section className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Available Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-2 text-gray-900">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-red-500 font-bold">{property.price}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
