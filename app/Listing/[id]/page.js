"use client";
import React, { useEffect, useState } from 'react'

const page = ({params}) => {
    const { id } = params;
    
   const [listing, setListing] = React.useState(null);
   const [loading, setLoading] = React.useState(true);
   const [error, setError] = React.useState(false);
   useEffect(() => {
     const fetchListing = async () => {
        try{
            setLoading(true);
       const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/listing/get/${id}`);
       const data = await res.json();
       if (res.ok) {
         setListing(data);
         setLoading(false);
       } else {
         setError(true);
         setLoading(false);
       }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
      
     };
     fetchListing();
   }, [id]);
 
  return (
    <div>
      {listing && <h1>{listing.name}</h1>}
      {error && <h1>Error fetching listing</h1>}
      {loading && <h1>Loading...</h1>}
    </div>
  )
}

export default page
