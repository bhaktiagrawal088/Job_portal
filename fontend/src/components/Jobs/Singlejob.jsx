import React from 'react'
import { Button } from '../ui/button'
import { BookMarked } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'

function Singlejob() {
  return (
    <div className='p-5 rounded-md shadow-md bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>2 days ago</p>
            <Button variant="outline" className="rounded-full" size = "icon"><BookMarked/></Button>
        </div>
        <div className='flex items-center gap-2 my-2 '>
            <Button className= " p-0.5 w-10 h-10" variant="outline" size="icons">
                <Avatar>
                    <AvatarImage  src="https://imgs.search.brave.com/uJGRrss5YN_rO5WuIXi0NBcuy4W_CVj-Qk7lp7_YFAA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzM2LzAyLzI2/LzM2MF9GXzEzNjAy/MjY3MV84Skg1T0hJ/c3Nwd1Rlb00wb3ZZ/SVNjWUlnU2JnaFhz/Zy5qcGc"></AvatarImage>
                </Avatar>
            </Button>
            <div>
                <h1 className='font-medium text-lg '>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>Title</h1>
            <p className='text-sm text-gray-600'>Find your dream job with our easy-to-use search platform, designed to
          help you discover exciting career opportunities that match your
          skills, experience, and aspirations.</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost ">12 Position</Badge>
            <Badge className={'text-orange-700 font-bold'} variant="ghost ">Part time</Badge>
            <Badge className={'text-green-700 font-bold'} variant="ghost ">24LPA</Badge>

        </div>
        <div className='flex items-center gap-4 mt-4'>
            <Button variant="outline">Details</Button>
            <Button className="bg-purple-800 hover:bg-purple-900 text-white">Save for later</Button>
        </div>
    </div>
  )
}

export default Singlejob
