"use client";
import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-red-600 mb-4">About Our Home Rental System</h1>
          <p className="text-gray-700 text-lg">
            Revolutionizing home rentals with cutting-edge technology.
          </p>
        </header>

        {/* About Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://i.pinimg.com/736x/7c/bf/24/7cbf24ccb788261b5cacfedc7eb29cd1.jpg" // Replace with an appropriate image path
              alt="Home Rental System"
              className="rounded-lg shadow-lg w-full max-w-md object-cover"
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-red-600">What We Offer</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our Home Rental System is a comprehensive platform designed to connect tenants and property owners seamlessly. Built using modern web technologies such as <strong>Next.js</strong>, <strong>Express.js</strong>, and <strong>MongoDB</strong>, it ensures high performance and scalability for handling multiple users.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From live property availability to advanced filtering options, our platform provides a hassle-free way to find or list rental homes. Whether you're a tenant searching for a cozy apartment or a property owner looking to showcase your listings, we've got you covered.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold mb-6 text-center text-red-600">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-red-600">Scalable Architecture</h3>
              <p className="text-gray-700">
                Designed to handle heavy traffic and multiple users simultaneously, ensuring smooth performance.
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-red-600">Live Availability</h3>
              <p className="text-gray-700">
                View real-time property availability, complete with images, prices, and owner contact details.
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-red-600">Advanced Search Filters</h3>
              <p className="text-gray-700">
                Narrow down your search by city, price range, property type, and more to find your perfect home.
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-red-600">Secure & Reliable</h3>
              <p className="text-gray-700">
                Built with top-notch security practices to ensure safe data handling and reliable performance.
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-red-600">Easy Property Listing</h3>
              <p className="text-gray-700">
                Property owners can easily list their homes with detailed descriptions, images, and contact information.
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2 text-red-600">User-Friendly Design</h3>
              <p className="text-gray-700">
                Intuitive interface designed for users of all experience levels to navigate and interact seamlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-red-600">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We aim to simplify the process of finding and renting homes through innovation and technology. Our goal is to create a trusted platform that fosters connections and enhances the rental experience for everyone.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
