import React from 'react'
import SeatNoTable from './smritilib/SeatNoTable'
import FeesTable from './smritilib/FeesTable'
import AttendanceTable from './smritilib/AttendanceTable'
import BooksTable from './smritilib/BooksTable'

const Dashboard = () => {
  return (
    <div className="p-4">
     
      <div className="mt-4">
        <h2 className="text-lg text-center font-semibold">Seat Numbers</h2>
        <SeatNoTable />
      </div>
      <div className="mt-4">
        <h2 className="text-lg text-center font-semibold">Fees</h2>
        <FeesTable />
      </div>
      <div className="mt-4">
        <h2 className="text-lg text-center font-semibold">Attendance</h2>
        <AttendanceTable />
      </div>
      <div className="mt-4">
        <h2 className="text-lg  text-center font-semibold">Books</h2>
        <BooksTable />
      </div>
    </div>
  )
}

export default Dashboard