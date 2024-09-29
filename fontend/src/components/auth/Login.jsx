import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Link } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import axios from 'axios'

function Login() {
    const [input, Setinput] = useState({
        email : "",
        password : "",
        role : "",
      
    })

    const changeEventListener = (e) => {
        Setinput({...input , [e.target.name] : e.target.value})
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post()

        } catch (error) {
            
        }
        
    }
   
    return (
        <div>
            <Navbar/>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10 shadow-md'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input 
                        type="email"
                        value={input.email}
                        name="email"
                        onChange={changeEventListener} 
                        placeholder="Enter your email"/>
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password"
                        value={input.password}
                        name="password"
                        onChange={changeEventListener} 
                        placeholder="Enter your password"/>
                    </div>
                    <div className='flex items-center justify-between'>
                    <RadioGroup value={input.role} onValueChange={(value) => Setinput({...input, role: value})} className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="student" id="student" />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="recruiter" id="recruiter" />
                                <Label htmlFor="recruiter">Recruiter</Label>
                            </div>
                    </RadioGroup>   
                    </div>
                        <Button className="w-full mb-2 text-white bg-black hover:bg-black">Login</Button>
                        <span className='text-sm'>Don't have have an account? 
                            <Link to='/signup' className='text-blue-800 text-bold' >  Signup</Link></span>
                </form>
            </div>
        </div>
      )
}

export default Login
