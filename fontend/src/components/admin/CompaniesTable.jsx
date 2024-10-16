import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover} from '@radix-ui/react-popover'
import { PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, MoreVertical } from 'lucide-react'

const CompaniesTable = () => {
  return (
    <>
        <Table>
            <TableCaption>A list of your recent register companies</TableCaption>
            <TableHeader>
                <TableRow className="font-bold">
                    <TableCell>Logo</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell className="text-right">Action</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableCell>
                <Avatar>
                    <AvatarImage width={52} height={52}
                     src="https://imgs.search.brave.com/uJGRrss5YN_rO5WuIXi0NBcuy4W_CVj-Qk7lp7_YFAA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzM2LzAyLzI2/LzM2MF9GXzEzNjAy/MjY3MV84Skg1T0hJ/c3Nwd1Rlb00wb3ZZ/SVNjWUlnU2JnaFhz/Zy5qcGc"></AvatarImage>
                </Avatar>
                </TableCell>
                <TableCell>Company name</TableCell>
                <TableCell>2022-01-01</TableCell>
                <TableCell className="text-right cursor-pointer">
                    <Popover>
                        <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                        <PopoverContent className="w-32">
                            <div className='flex items-center gap-2 w-fit'>
                                <Edit2 className='w-4'/>
                                <span>Edit</span>
                            </div>
                        </PopoverContent>
                    </Popover>
                </TableCell>
            </TableBody>
        </Table>
    </>
  )
}

export default CompaniesTable