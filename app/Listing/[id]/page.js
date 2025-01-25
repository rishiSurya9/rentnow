"use client";
import React, { useEffect } from 'react'

const page = (params) => {
    const {id} = params;
    useEffect(() => {
        const fetchListting = async () => {
       const res = fetch(`${process.env.PUBLIC_API}/api/listing/get/${id}`);
       const data = await res.json();
       console.log(data);
        }
        fetchListting();
    }, 
    [id])
  return (
    <div>
      <h2>Listing {id}</h2>
    </div>
  )
}

export default page
