'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import {supabase} from '@/utils/supabase/client'
import Listing from './Listing'

function ListingMapView({type}) {

  const [listing,setListing] = useState([])
  useEffect(()=>{
    getLatestListing()
  },[])

  const [searchedAddress, setSearchedAddress] = useState()
  const [bedCount,setBedCount]=useState(0)
  const [bathCount,setBathCount]=useState(0)
  // const [Count,setBedCount]=useState(0)
  const [parkingCount,setParkingCount]=useState(0)
  const [homeType,setHomeType]=useState(0)

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
      toast('Server Side Error')
    }

  }

  const handleSearchClick = async () => {
    // console.log(searchedAddress)
    const searchTerm = searchedAddress?.value.structured_formatting.main_text
    console.log("hi")
    let query = supabase
    .from('listing')
    .select(`*,listingimages(
      url,
      listing_id
    )`)
    .eq('active',true)
    .eq('type',type)
    .gte('bedroom',bedCount)
    .gte('bedrbathroom',bathCount)
    .gte('parking',parkingCount)
    
    .like('address','%'+searchTerm+'%')
    .order('id',{ascending:false})


    if(homeType){
      query=query.eq('propertyType',homeType)
    }
    const {data,error} = await query
    if(data){
      setListing(data)
    }
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div>
        <Listing listing={listing} handleSearchClick={handleSearchClick}
        searchedAddress={(v)=>setSearchedAddress(v)}
        setBedCount={setBedCount}
        setBathCount={setBathCount}
        setParkingCount={setParkingCount}
        setHomeType={setHomeType}/>
      </div>
      <div>
        Map
      </div>
    </div>
  )
}

export default ListingMapView