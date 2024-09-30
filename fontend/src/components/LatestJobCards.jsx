import React from 'react'
import { Badge } from './ui/badge'

function LatestJobCards() {
  return (
    <div className='p-5  border border-gray-100 shadow-md rounded-lg cursor-pointer'> 
        <div>
        <h1 className='font-medium text-lg'>Company Name</h1>
        <p className='text-sm text-gray-500'>India</p>
        </div>  
        <div>
            <h1 className='font-bold text-lg my-2'>Job Title</h1>
            <p className='text-sm text-gray-700'>write about the job description of realtive job. This position offers a dynamic opportunity for individuals interested</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost ">12 Position</Badge>
            <Badge className={'text-orange-700 font-bold'} variant="ghost ">Part time</Badge>
            <Badge className={'text-green-700 font-bold'} variant="ghost ">24LPA</Badge>

        </div>
        
      
    </div>
  )
}

export default LatestJobCards
