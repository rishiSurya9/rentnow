import React from 'react'

const search = () => {
  return (
    <div>
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

    </div>
  )
}

export default search
