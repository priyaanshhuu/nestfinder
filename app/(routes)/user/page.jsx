'use client'
import React from 'react'
import { UserButton, UserProfile } from '@clerk/nextjs'
import { Building2 } from 'lucide-react'

function User() {
  return (
    <div className='my-6 md:px-10 lg:px-32'>
      <h2 className='font-bold text-2xl p  y-3'>Profile</h2>
      <UserProfile>
      </UserProfile>
    </div>
  )
}

export default User