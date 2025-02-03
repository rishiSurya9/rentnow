'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css/navigation';



const content = () => {
    const [offerLisiting, setofferLisiting] = useState([]);
    const [saleListing, setsaleListing] = useState([]);
    const [rentListing, setRentListing] = useState([]);
    SwiperCore.use(Navigation)

    useEffect (()=>{
        const fetchOfferLisitings = async () => {
            try {
             const res = await fetch(`${process.env.PUBLIC_API}/api/listing/get?offer=true&limit=4`);
             const data = await res.json();
             setofferLisiting(data);
            } catch (error) {
                console.log(error);
                
            }
        }
        
        const fetchRentListings = async () => {
            try {
             const res = await fetch(`${process.env.PUBLIC_API}/api/listing/get?type=rent&limit=4`);
             const data = await res.json();
             setsaleListing(data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchSaleListings = async () => {
            try {
             const res = await fetch(`${process.env.PUBLIC_API}/api/listing/get?type=sale&limit=4`);
             const data = await res.json();
             setRentListing(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchSaleListings();
        fetchRentListings();
        fetchOfferLisitings();
    },[])


  return (
    <>
      {/* top */}
      <div className='flex flex-col gap-6  p-28 px-3 max-w-6xl mx-auto'>
        <h1 className=' text-slate-700 font-bold text-3xl lg:text-6xl '>
            Find Your next <span className='text-slate-500'>perfect</span>
            <br />
        </h1>

        <div className='text-gray-400 tet-xs sm: text-sm '>
            Rentnow is best place to find you next perfect rent house 
            place to live
            <br />
            We have a wide range of properties for you to 
            choose form.
        </div>

        <Link href={'/Search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline '>
             Lets get started....
        </Link>
      </div>

      {/* swipper */}
        
        <Swiper Navigation>
            {
                offerLisiting && offerLisiting.length > 0 && 
                offerLisiting.map ((listing)=>(
                    <SwiperSlide>
                        <div style={{background:`url(${listing.imageUrls[0]} )  center no-repeat`, backgroundSize:'cover'}}  className='h-[500px]' key= {listing._id}>

                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>



      {/* lisiting  */}
    </>
  );
};

export default content;
