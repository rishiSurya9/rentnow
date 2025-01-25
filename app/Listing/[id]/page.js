"use client";
import React, { useEffect, useState } from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
const page = ({params}) => {
    SwiperCore.use([Navigation]);
    const { id } = params;
    
   const [listing, setListing] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
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
      {loading  && <p className='text-center'>Loading...</p>}
      {error && (<p className='text-center'>Error fetching listing</p>)}
      {listing && !loading && !error && 
      (
        <div>
       <Swiper navigation>
         {listing.imageUrls.map((url) => (
            
           <SwiperSlide key={url}>
             <div className='h-[550px]' style={{background: `url(${url}) center no-repeat` , backgroundSize: 'cover'}}></div>
           </SwiperSlide>
         ))}
       </Swiper> 
       </div>
      )}
    </div>
  )
}

export default page
