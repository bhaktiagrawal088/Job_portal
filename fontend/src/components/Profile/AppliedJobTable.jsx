import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'

function AppliedJobTable() {
  return (
    <div>
      <Table>
        <TableCaption>List of  your Applied Jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                [1,2].map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>06-10-2024</TableCell>
                        <TableCell>Frontend Developer</TableCell>
                        <TableCell>Google</TableCell>
                        <TableCell><Badge className="bg-slate-600 text-white rounded-full hover:bg-slate-600">Selected</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
