import React from 'react';

const page = () => {
  return (
    <div className='flex flex-col md:flex-row gap-2 '>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form  className='flex flex-col gap-8' action="">
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold' htmlFor="">Search Term:</label>
                <input type="text"
                id='searchTerm'
                placeholder='search...'
                className='border rounded-lg p-3 w-full' />
            </div>

            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold' htmlFor="">Type:</label>
              <div className='flex gap-2'>
                <input type="checkbox"  id='all' className='w-5'/>
                <span>Rent ans sales</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox"  id='rent' className='w-5'/>
                <span>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox"  id='sale' className='w-5'/>
                <span>Sale</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox"  id='offer' className='w-5'/>
                <span>Offer</span>
              </div>
            </div>

            <div className='flex gap-2 flex-wrap items-center'>
              <label className='font-semibold' htmlFor="">Amenities:</label>
              <div className='flex gap-2'>
                <input type="checkbox"  id='parking' className='w-5'/>
                <span>Parking</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox"  id='furnished' className='w-5'/>
                <span>Furnished</span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <label className='font-semibold' htmlFor="">Sort:</label>
              <select name="" id="sort_order"className='border rounded-lg p-3'>
                <option >Price high to low </option>
                <option >Price low to high </option>
                <option >Latest</option>
                <option >Oldest</option>
              </select>
            </div>

            <button className='bg-slate-700 text-white p-3 rounded-lg mt-4 uppercase hover:opacity-95'>Search</button>
        </form>
      </div>

      <div className='text-3xl font-bold border-b p-3 text-slate-700 mt-5'>
        <h1>Listing result</h1>
      </div>
    </div>
  );
};

export default page;
