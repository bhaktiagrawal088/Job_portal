import React from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const filterData = [
    {
        filterType : "Location",
        array : ["Delhi NCR" , "Banglore" , "Hyderabad", "Pune" , "Mumbai"]
    },
    {
        filterType : "Industry",
        array : ["IT" ,  "Backend Devloper" , "Frontend Developer", "Full Stack Developer","Finance" , "Healthcare" , "Manufacturing"]
    },{
        filterType : "Job Type",
        array : ["Full Time", "Part Time", "Internship"]
    },
    {
        filterType : "Salary",
        array : ["Below 5 LPA", "5-10 LPA", "10-30 LPA" , "30-60 LPA" ]
    }
]
function FilterCard() {
  return (
    <div className='w-full bg-white rounded-md p-3'>
        <h1 className='font-bold'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup>
            {
                filterData.map((data, index) => (
                    <div>
                        <h1 className='font-medium'>{data.filterType}</h1>
                        {
                            data.array.map((item, index) => (
                                <div className='flex items-center space-x-2 my-2 text-sm'>
                                    <RadioGroupItem value={item}/>
                                <label>{item}</label>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
            
        </RadioGroup>
    </div>
  )
}

export default FilterCard
