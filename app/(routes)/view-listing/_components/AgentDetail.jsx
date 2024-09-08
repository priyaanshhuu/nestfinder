import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function AgentDetail({ listingDetail }) {

  const handleEmailClick = () => {
    const email = listingDetail?.createdBy || 'default@example.com'; // Fallback in case createdBy is undefined
    const subject = 'Hello';
    const body = 'I am interested regarding your property';

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className='flex gap-5 items-center justify-between 
    p-5 rounded-lg shadow-md border my-6'>
      <div className='flex items-center gap-6'>
        <Image src={listingDetail?.profileimage}
          alt='profileImage'
          width={60}
          height={60}
          className='rounded-full'
        />
        <div>
          <h2 className='text-lg font-bold'>{listingDetail?.fullName}</h2>
          <h2 className='text-gray-500'>{listingDetail?.createdBy}</h2>
        </div>
      </div>
      <button onClick={handleEmailClick}>
        Send Email
      </button>
    </div>
  )
}

export default AgentDetail