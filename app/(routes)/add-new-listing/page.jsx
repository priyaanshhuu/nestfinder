'use client'

import GoogleAddressSearch from '@/app/_components/GoogleAddressSearch'
import { Button } from '@/components/ui/button'
import { supabase } from '@/utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
// import { createClient } from '@supabase/supabase-js'
// import { toast } from '@/hooks/use-toast'
// import { useToast } from "@/components/hooks/use-toast"
// import {useToast} from '../../../components/ui/toast'

// import { useToast } from "@/components/hooks/use-toast"



import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState()
  const [coordinates, setCoordinates] = useState()
  const { user } = useUser()
  console.log(user)
  const [loader, setLoader] = useState(false)
  const router = useRouter()

  const NextHandler = async () => {
    console.log(selectedAddress, coordinates)
    setLoader(true)
    // const row = {

    // }

    // const dataa = JSON.stringify(row)

    const { data, error } = await supabase
      .from('listing')
      .insert({
        address: selectedAddress.label,
        coordinates: coordinates,
        createdBy: user?.primaryEmailAddress.emailAddress
      })
      .select()


    if (data) {
      console.log("New data added")
      setLoader(false)
      toast.success('New address added for listing', {
        })
      router.replace('/edit-listing/'+data[0].id)
    } if (error) {
      setLoader(false)
      console.log('error adding new data')
      toast.error('Server side error')
    }

  }
  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
      <div className='p-10 flex flex-col gap-5 items-center justify-center w-full'>
        <h2 className='font-bold text-2xl'>Add New Listing</h2>
        <div className='p-5 rounded-lg border shadow-md flex flex-col gap-5 w-full'>
          <h2 className='font-medium text-gray-500 text-center'>Enter Address which you want to list</h2>
          <div className='w-full'>
            <GoogleAddressSearch
              selectedAddress={(value) => setSelectedAddress(value)}
              setCoordinates={(value) => setCoordinates(value)}
            />
          </div>

          <Button onClick={NextHandler}
            disabled={!selectedAddress || !coordinates}
          >
          {loader?<Loader className='animate-spin'/>:'Next'}
          </Button>
          <ToastContainer/>
        </div>
      </div>
    </div>

  )
}

export default AddNewListing