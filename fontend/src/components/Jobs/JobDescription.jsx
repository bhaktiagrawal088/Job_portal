import React from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

function JobDescription() {

    const isApplied = true;
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
            <h1 className='font-bold text-xl'>Full Stack Developer</h1>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost ">12 Position</Badge>
                <Badge className={'text-orange-700 font-bold'} variant="ghost ">Part time</Badge>
                <Badge className={'text-green-700 font-bold'} variant="ghost ">24LPA</Badge>
            </div>
        </div>
        <Button
        className={`text-white rounded-xl ${isApplied ? 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed ' : 'bg-purple-800 hover:bg-purple-900'}`}>
        {
            isApplied ? 'Already Applied ' :  'Apply Now'
        }
        </Button>
      </div>
        <h1 className='border-b-2 border-b-gray-400 font-medium py-4'>Job description</h1>
      <div className='my-4'>
            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>Full Stack Developer</span></h1>
            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>Hyderabad</span></h1>
            <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>Full Stack Developer,  with good communication skills</span></h1>
            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>2 yrs</span></h1>
            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>12 LPA</span></h1>
            <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>4</span></h1>
            <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>06-10-2024</span></h1>

      </div>
    </div>
  )
}

export default JobDescription
