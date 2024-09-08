'use client'

import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Formik } from 'formik'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import FileUpload from '../_components/FileUpload'
import { Loader } from 'lucide-react'



function EditListing({ params }) {
  const [isVerified, setIsVerified] = useState(false)
  const { user } = useUser()
  console.log("Aveek",user)
  const router = useRouter()

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // console.log(params)
    user && verifyUserRecord()
  }, [user, isVerified, images])

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from('listing')
      .select('*,listingimages(listing_id,url)')
      .eq('createdBy', user?.primaryEmailAddress.emailAddress)
      .eq('id', params.id)

    // if(data){
    //   console.log(data)
    // }


    // console.log(data)

    if (data.length == 0) {
      router.replace('/')
    } else {
      setIsVerified(true)
    }
  }

  const onSubmitHandler = async (formValue) => {
    setLoading(true)
    console.log(formValue)

    const { data, error } = await supabase
      .from('listing')
      .update(formValue)
      .eq('id', params.id)
      .select()

    // console.log(data)

    if (data) {
      // console.log(data)
      toast.success('Listing Updated Successfully')
      setLoading(false)
    }

    for (const image of images) {
      setLoading(true)

      const file = image
      // console.log("Aveek", file)
      const fileName = Date.now().toString()
      const fileExt = file.name.split('.').pop()
      // console.log(fileExt)
      const { data, error } = await supabase.storage
        .from('listingimage')
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false
        })

      if (error) {
        // console.log(error)
        setLoading(false)
        toast('Error while uploading images')
      }

      else {
        // console.log(data)
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName
        // console.log(imageUrl)

        const { data, error } = await supabase
          .from('listingimages')
          .insert(
            { url: imageUrl, listing_id: params.id }
          )
          .select()

        if (data) {
          setLoading(false)
        }

        if (error) {
          setLoading(false)
        }
      }
      setLoading(false)
    }

  }

  const publishButtonHandler = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('listing')
      .update({ active: true })
      .eq('id', params?.id)
      .select()
      

      if(data){
        setLoading(false)
        toast('Listing Published')
      }
  }
  return (
    <>
      {isVerified && <div className='px-10 md:px-36 my-10'>
        <h2 className='font-bold text-2xl'>Enter some more details about your listing</h2>
        <Formik
          initialValues={{
            type: '',
            propertyType: '',
            profileimage: user?.imageUrl,
            fullName: user?.fullName
          }}
          onSubmit={(values) => {
            console.log(values)
            onSubmitHandler(values)
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit}>
              <div className='p-8 rounded-lg shadow-lg mt-5'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-lg text-gray-500'>Rent or Sell?</h2>
                    <RadioGroup onValueChange={((v) => values.type = v)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Rent" id="Rent" />
                        <Label htmlFor="Rent">Rent</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sell" id="Sell" />
                        <Label htmlFor="Sell">Sell</Label>
                      </div>
                    </RadioGroup>

                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-lg text-gray-500'>Property Type</h2>
                    <Select
                      onValueChange={(e) => values.propertyType = e}
                      name='propertyType'
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single Family House">Single Family House</SelectItem>
                        <SelectItem value="Town House">Town House</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>

                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className=' text-gray-500'>Bedroom</h2>
                    <Input type='number' placeholder='Ex.2' name='bedroom' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className=' text-gray-500'>Bathroom</h2>
                    <Input type='number' placeholder='Ex.2' name='bathroom' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className=' text-gray-500'>Built In</h2>
                    <Input type='number' placeholder='Ex.1900 Sq.Ft' name='builtin' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className=' text-gray-500'>Parking</h2>
                    <Input type='number' placeholder='Ex.2' name='parking' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className=' text-gray-500'>Lot Size(Sq.Ft)</h2>
                    <Input type='number' placeholder='' name='lotSize' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className=' text-gray-500'>Area</h2>
                    <Input type='number' placeholder='Ex.1900' name='area' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className=' text-gray-500'>Selling Price(&#8377;)</h2>
                    <Input type='number' placeholder='' name='price' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className=' text-gray-500'>HOA(Per Month)(&#8377;)</h2>
                    <Input type='number' placeholder='' name='hoa' onChange={handleChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className=' text-gray-500'>Description</h2>
                    <Input type='text' placeholder='Tell a precise and short overview of the Property' name='description' onChange={handleChange} />
                  </div>
                  <div>
                    <h2 className='font-lg text-gray-500 my-2'>Upload Property Images</h2>
                    <FileUpload setImages={(value) => setImages(value)} />
                  </div>
                  <div className='flex gap-7 justify-end'>
                    <Button className='mt-8' type='submit' disabled={loading} variant='outline'>
                      {loading ? <Loader className='animate-spin' /> : 'Save'}
                    </Button>
                    <Button className='mt-8' type='submit' disabled={loading} variant='outline ' onClick={publishButtonHandler}>
                      {loading ? <Loader className='animate-spin' /> : 'Save and Publish'}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}

        </Formik>
        <ToastContainer />
      </div>}
    </>
  )
}

export default EditListing