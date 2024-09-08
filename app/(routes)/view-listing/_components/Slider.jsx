import React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


import Image from "next/image"

function Slider({ imageList }) {
  return (
    <div className="mt-5">

      {imageList ? (<Carousel>
        <CarouselContent>
 
        {imageList.map((item, index) => (


          <CarouselItem>

            <div key={index}>
              <Image src={item.url} width={800} height={300} alt={item.url} className='rounded-xl object-cover h-[300px] w-full' />
            </div>
          </CarouselItem>


          ))}

        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>):(<div className="w-full h-[200px] bg-gray-400 animate-pulse"></div>)}
      


      {/* {imageList?
      <Carousel>
        <CarouselContent>
          {imageList.map((item,index)=>{
            <CarouselItem>
              <Image src={item.url} width={800} height={300} alt={item.url} className='rounded-xl object-cover h-[300px] w-full'/> 
            </CarouselItem>
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>:

        <div className="w-full h-[200px] bg-gray-400 animate-pulse">
        </div>
      } */}

    </div>
  )
}

export default Slider