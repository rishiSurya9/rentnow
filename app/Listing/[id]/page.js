import React from 'react'

const page = (params) => {
    const {id} = params;
  return (
    <div>
      <h2>Listing {id}</h2>
    </div>
  )
}

export default page
