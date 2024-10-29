import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'


const PostNewJobs = () => {

    const companyArray = [];

    const [input , setInput] = useState({
        title: '',
        description: '',
        requirements : '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position : '',
        companyId : ''
    });
    
    const companies = useSelector(store => store.company)
    const changeEventHandler = (e) => {
        setInput({...input, [e.target.name] : e.target.value})
    }
  return (
    <>
        <Navbar/>
        <div className='flex justify-center items-center w-screen my-5'>
        <form action='' className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
        <div className='grid grid-cols-2 gap-2 font-semibold'>
            <div>
                <Label>Title</Label>
                <Input type="text" name="title"  value={input.title} onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1"/>
            </div>
            <div>
                <Label>Description</Label>
                <Input type="text" name="description"  value={input.description} onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1"/>
            </div>
            <div>
                <Label>Requirements</Label>
                <Input type="text" name="requirements"  value={input.requirements} onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1"/>
            </div>
            <div>
                <Label>Salary</Label>
                <Input type="text" name="salary"  value={input.salary} onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1"/>
            </div>
            <div>
                <Label>Location</Label>
                <Input type="text" name="location"  value={input.location} onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1"/>
            </div>
            <div>
                <Label>Job Type</Label>
                <Input type="text" name="jobType"  value={input.jobType} onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1"/>
            </div>
            <div>
                <Label>Experience Level</Label>
                <Input type="text" name="experience"  value={input.experience} onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1"/>
            </div>
            <div>
                <Label>Number of Position</Label>
                <Input type="number" name="position"  value={input.position} onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus:visible:ring-0 my-1"/>
            </div>  
            {
                companies.length > 0 && (
                    <Select>
                        <SelectTrigger>
                            <span>Company</span>
                            <SelectValue placeholder= {'select a company'}/>
                        </SelectTrigger>

                        <SelectContent>
                            <SelectGroup>
                                {companies.map((company) =>{
                                    return (
                                        <SelectItem>{company.name}</SelectItem>
                                    )
                                })}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )
            }
        </div>
        <Button className="w-full mt-4 text-white bg-black hover:bg-black font-bold"> Post New Job</Button>
        {
            companyArray.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting any job</p>
        }
        </form>

        </div>
    </>
  )
}

export default PostNewJobs