'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import {supabase} from '@/utils/supabase/client'
import Listing from './Listing'
import GoogleMapSection from './GoogleMapSection'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ListingMapView({type}) {

  const [listing,setListing] = useState([])
  useEffect(()=>{
    getLatestListing()
  },[])

  const [searchedAddress, setSearchedAddress] = useState()
  const [bedCount,setBedCount]=useState(0)
  const [bathCount,setBathCount]=useState(0)
  const [coordinates,setCoordinates]=useState(0)
  const [parkingCount,setParkingCount]=useState(0)
  const [homeType,setHomeType]=useState()

  const getLatestListing= async ()=>{
    const {data,error} = await supabase
    .from('listing')
    .select(`*,listingimages(
      url,
      listing_id
    )`)
    .eq('active',true)
    .eq('type',type)
    .order('id',{ascending:false})

    if(data){
      console.log(data)
      setListing(data)
    }
    if(error){
      toast.error('Server Side Error')
    }

  }

  const handleSearchClick = async () => {
    // console.log(searchedAddress)
    const searchTerm = searchedAddress?.value.structured_formatting.main_text
    // console.log(searchTerm)
    // console.log("hi")
    let query = supabase
    .from('listing')
    .select(`*,listingimages(
      url,
      listing_id
    )`)
    .eq('active',true)
    .eq('type',type)
    .gte('bedroom',bedCount)
    .gte('bathroom',bathCount)
    .gte('parking',parkingCount)
    
    .like('address','%'+searchTerm+'%')
    .order('id',{ascending:false})


    if(homeType){
      query=query.eq('propertyType',homeType)
    }
    
    const {data,error} = await query
    if(data){
      console.log(data)
      setListing(data)
    }

    // console.log(error)
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div>
        <Listing listing={listing} handleSearchClick={handleSearchClick}
        searchedAddress={(v)=>setSearchedAddress(v)}
        setBedCount={setBedCount}
        setBathCount={setBathCount}
        setParkingCount={setParkingCount}
        setHomeType={setHomeType}
        setCoordinates={setCoordinates}/>
      </div>


      <div className='fixed right-10 h-full md:w-[350px] lg-[450px] xl:w-[650px]'>
        <GoogleMapSection
          coordinates={coordinates}
          listing={listing}
        />
      </div>
    </div>
  )
}

export default ListingMapView