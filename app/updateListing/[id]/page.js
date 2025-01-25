import React from 'react';

const UpdateListingPage = ({ params }) => {
  const { id } = params; // Access the dynamic `id` from the route

  return (
    <div>
      <h1>Update Listing</h1>
      <p>Listing ID: {id}</p>
    </div>
  );
};

export default UpdateListingPage;
