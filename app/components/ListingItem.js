'use client'
import React from 'react'
import Link from 'next/link'

const ListingItem = ({listing}) => {
  return (
    <>
        <Link to={`/listing/${listing._id}`}>   
              <img src={listing.imageUrls[0]} alt="listing cover"
              className='h-'
              />
              
        </Link>

    </>
  )
}

export default ListingItem