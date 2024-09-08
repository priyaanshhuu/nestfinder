'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Header() {
  const path = usePathname()
  const { user, isSignedIn } = useUser()
  return (
    <div className='p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white'>
      <div className='flex gap-10 items-center'>
        <Image src='/House.png' width={50} height={50} alt='logo' className='rounded-bl-2xl'></Image>
        <ul className='md:flex hidden gap-10 '>
          <Link href={'/'}>
            <li className={`'hover:text-primary font-medium text-sm cursor-pointer' ₹{path == '/' && 'text-primary'}`}>For Sale</li>
          </Link>
          <Link href={'/rent'}>
            <li className={`'hover:text-primary font-medium text-sm cursor-pointer' ₹{path == '/rent' && 'text-primary'}`}>For Rent</li>
          </Link>
          <li className='hover:text-primary font-medium text-sm cursor-pointer'>Agent Finder</li>
        </ul>
      </div>
      <div className='flex gap-2 items-center'>
        <Link href={'/add-new-listing'}>
          <Button className='flex gap-2'><Plus className='h-5 2-5' />
            Post Your Ad
          </Button>
        </Link>
        {isSignedIn ?

          <DropdownMenu>
            <DropdownMenuTrigger asChild><Image src={user?.imageUrl} width={35} height={35} alt='user-profile' className='rounded-full' /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={'/user'}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem><Link href={'/myListing'}>My Listing</Link></DropdownMenuItem>
              <DropdownMenuItem> <SignOutButton>Logout</SignOutButton></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          :
          <Link href={'/sign-in'}>
            <Button variant='outline'>
              Login
            </Button>
          </Link>
        }
      </div>
    </div>
  )
}

export default Header

