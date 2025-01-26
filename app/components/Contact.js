import React, { useEffect, useState } from 'react';

export default function Contact({ listing }) {
  const [landload, setLandload] = useState(null);
  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(async () => {
    const fetchLandload = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandload(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandload();
  }, [listing.userRef]);
  return (
    <>
      {landload && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <Span>landload.username</Span>for{' '}
            <span className="font-semibold">{listing.name.tolowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onchange={onChange}
            placeholder="message here"
            className="w-full border border-gray-300 rounded-lg p-2"
          ></textarea>

          <Link
            to={`mailto:${landload.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-blue-500 text-white text-center rounded-lg p-2"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
