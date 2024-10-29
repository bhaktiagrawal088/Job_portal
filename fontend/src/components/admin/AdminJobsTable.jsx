import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const {allAdminJobs, searchJobByText} = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) =>{
      if(!searchJobByText){
        return true
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
    });
    console.log('Filtered Jobs:', filteredJobs); // Log filtered jobs for debugging
    setFilterJobs(filteredJobs);
  }, [allAdminJobs,searchJobByText])
  return (
    <>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="font-bold">
            <TableCell>Company Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Date</TableCell>
            <TableCell className="text-right ">Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                No Jobs found
              </TableCell>
            </TableRow>
          ) : 
              (
                filterJobs?.map((job) => (
                <tr>
                    <TableCell>{job?.company?.name}</TableCell>
                    <TableCell>{job?.title}</TableCell>

                    <TableCell>                  
                    {job?.createdAt ? job?.createdAt.split("T")[0] : "N/A"}
                    </TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger asChild>
                          <MoreHorizontal  className="inline-block"/>
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                        <div className="">
                          <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                            <Edit2 className="w-4" />
                            <span>Edit</span>
                          </div>

                        </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </tr>
                ))
              )}
        </TableBody>
      </Table>
    </>
  );
 };

export default AdminJobsTable;
