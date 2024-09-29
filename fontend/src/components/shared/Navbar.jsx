import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";

function Navbar() {
    const user = false;
  return (
    <div>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#6956a8]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browser</li>
            {/* <li><Link>Home</Link></li>
            <li><Link>Jobs</Link></li>
            <li><Link>Browser</Link></li> */}
          </ul>
            {
                !user ? (
                    <div className="flex gap-2 items-center ">
                        <Link to="/login">
                            <Button  className= "bg-gray-200 hover:bg-gray-300 rounded-xl" variant="">Login</Button>
                        </Link>
                        <Link to="/signup">
                            <Button className="bg-[#6A38C2] hover:bg-[#4f2596] text-white rounded-xl">Signup</Button>
                        </Link>
                    </div>
                ) : <div>
                <Popover>
            <PopoverTrigger asChild>
                <Avatar className= "cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2">
                    <Avatar className= "cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div>
                        <h4 className="font-medium">Bhakti Agrawal</h4>
                        <p className="text-sm text-gray-500">I am full stack developer</p>
                    </div>
                </div>
                    <div className="flex flex-col my-2 text-gray-600">
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                            <User2/> 
                            <Button variant="link">View Profile</Button>
                        </div>
                        <div className="flex w-fit items-center gap-2 cursor-pointer text-red-700 ">
                            <LogOut/>
                            <Button variant="outline">Logout</Button>
                        </div>
                    </div>
            </PopoverContent>
          </Popover>
                </div>
            }
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;
