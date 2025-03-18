'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import Contact from '@/app/components/Contact.js';
import 'swiper/css/bundle';
import { TbBuildingBroadcastTowerFilled } from "react-icons/tb";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaBuilding
} from 'react-icons/fa';

const page = ({ params }) => {
  SwiperCore.use([Navigation]);
  const { id } = params;
  const MailId = '';
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        setLoading(true);
        const res = await fetch(
          `${process.env.PUBLIC_API}/api/listing/get/${id}`,
        );

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
  const fetchMailId = async () => {
    try {
      const res = await fetch(
        `${process.env.PUBLIC_API}/api/user/mail/${listing.userRef}`,
      );
      const data = await res.json();
      if (res.ok) {
        MailId = data;
        console.log(MailId);
        window.location.href = `mailto:${MailId}`;
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Error fetching listing</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto  p-3  gap-6">
            <div className='flex gap-3'>
            <p className="text-2xl font-semibold gap-5">
              {listing.name}
            </p>
            <p className='text-3xl font-bold '>
            {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' rs/month'}
            </p>
            </div>
           

            <ul className='font-semibold text-sm flex items-center gap-4 sm:gap-6 flex-wrap'>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaMapMarkerAlt className="text-green-700" />
                {listing.address}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBuilding />
                {listing.propertyType}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                <TbBuildingBroadcastTowerFilled />
                {listing.propertyType}
                </li>
            </ul>
            {/* <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className='flex gap-2 font-semibold'>
              <p>
                <SlShareAlt />
                {listing.propertyType}
              </p>
              <p>{listing.area}</p>
            </div> */}

            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800 ">
              <span className="font-semibold text-black">Descriptionn -</span>
              {listing.description}
            </p>
            <ul className="text-green-800 font-semibold text-sm flex items-center gap-4 sm:gap-6 flex-wrap">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.BHK} BHK`
                  : `${listing.BHK} BHK`}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.rooms} Rooms`
                  : `${listing.rooms} Rooms`}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.Parking ? 'Parking spot' : 'No Parking'}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaChair className="text-lg" />
                {listing.furnished ? 'Furnished' : 'Not Furnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className="bg-sky-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact Landload
              </button>
            )}
            {/* <Contact listing={listing}  */}
            {contact && (
              <button
                onClick={fetchMailId}
                className="bg-sky-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact Landload
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
