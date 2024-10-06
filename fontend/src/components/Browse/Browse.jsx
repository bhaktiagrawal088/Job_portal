import React from 'react'
import Navbar from '../shared/Navbar'
import Jobs from '../Jobs/Jobs';
import Singlejob from '../Jobs/Singlejob';

const randomJobs = [1,2,3,4,5,6];
function Browse() {
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-8'>Search Result ({randomJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4 mt-4'>
        {
            randomJobs.map((item, index) => {
                return(
                    <Singlejob/>
                )
            })
        }

        </div>
       
      </div>
    </div>
  )
}

export default Browse
