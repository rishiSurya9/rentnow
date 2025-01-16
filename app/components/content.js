import React from "react";

function content() {
  return (
    <>
      <div className="mx-auto  ">
        <div className=" mt-6 ml-5  justify-center items-center text-black font-bold text-3xl flex   ">
          <h1 className="">Search Your Home with RentNow</h1>
        </div>

        <div className="flex justify-center items-center mt-3  ">
          <input className="border border-black p-1  " type="text" />
          <button className="border border-red-500 p-1">Search</button>
        </div>
      </div>
    </>
  );
}

export default content;
