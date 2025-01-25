"use client";
import React, { useEffect } from 'react'

const page = ({params}) => {
    const { id } = params;
   useEffect(() => {
    const fetchListing = async () => {
      const listingId = id;
      const res = await fetch(`${process.env.PUBLIC_API}/api/listing/get/${listingId}`);
      const data = await res.json();
      if (res.ok) {
       console.log(data);
      } else {
        console.log(data.message);
      }
    };
    fetchListing();
  }, [id]);
  return (
    <div>
      <h2>Listing {id}</h2>
    </div>
  )
}

export default page
