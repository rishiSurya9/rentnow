import React, { useEffect } from 'react'

export default function Contact({lisitng}) {
  const [landload , setLandload] = useState(null);

  useEffect(async() => {
   try {
    const res = await fetch(`/api/${listing.userRef}`);
    const data = await res.json();
    setLandload(data);

   } catch (error) {
     console.log(error);
    
   }
   fetchLandload();

  },[listing.userRef]
  )
  return (

    <>
       {landload && (
        <div className=''>
            <p>Contact <Span>landload.username</Span></p>
        </div>
       )}

    </>
  )
}
