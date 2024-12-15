import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Jobs from '../Jobs/Jobs';
import Singlejob from '../Jobs/Singlejob';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/Hooks/useGetAllJobs';

function Browse() {
  useGetAllJobs()
  const {allJobs } = useSelector(state => state.job);
  const dispatch =  useDispatch();

  

  useEffect(()=> {
    return() => {
      dispatch(setSearchQuery(""))
    }
  },[])

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-8'>Search Result ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4 mt-4'>
        {
            allJobs.map((job) => {
                return(
                    <Singlejob key={job._id} job={job}/>
                )
            })
        }

        </div>
       
      </div>
    </div>
  )
}

export default Browse
