'use client'
import React from 'react'


 const ListingItem = ({listing}) => {
  return (
    <>
       <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]'>

            <Link to={`/listing${listing._id}`}>
                <img src={listing.imageUrls[0]}
                className='h-[320px] sm:[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                 alt="Listing cover" />

                 <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='truncate text-lg font-semibold text-slate-700'> {listing.name}</p>

                    <div className='flex items-center gap-1 '>
                        <MdLocationOn className='h-4 w-4 text-green-700' />
                        <p className='text-gray-600 text-sm truncate '>{listing.address}</p>
                    </div>
                 </div>
            </Link>
       </div>
    </>
  )
}

export default ListingItem