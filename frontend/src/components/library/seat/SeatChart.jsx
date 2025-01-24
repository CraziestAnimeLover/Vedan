import React, { useState } from 'react';
import Navbar from '../../shared/Navbar';
import SeatNavbar from './SeatNavbar';
import CircularSeat from './CircularSeat';

const SeatChart = () => {
  // Mock seat data for rows and columns (with more realistic dimensions)
  const rowCount = 5; // number of rows
  const colCount = 6; // number of columns per row
  
  // Generate seat data based on rowCount and colCount
  const generateSeats = () => {
    let seatData = [];
    let seatNumber = 1;

    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        seatData.push({
          id: seatNumber,
          type: 'seat',
          isOccupied: Math.random() > 0.3, // Randomly assign some seats as occupied
          seatNumber: seatNumber++,
        });
      }
    }

    return seatData;
  };

  const [seats, setSeats] = useState(generateSeats());

  // Handle seat selection/deselection
  const handleSeatClick = (id) => {
    setSeats(seats.map(seat =>
      seat.id === id && !seat.isOccupied
        ? { ...seat, isOccupied: true }
        : seat
    ));
  };

  // Render the seat grid with rows and columns
  const renderSeatLayout = () => {
    let rows = [];

    // Create rows of seats
    for (let row = 0; row < rowCount; row++) {
      let cols = [];

      // Create columns for each row
      for (let col = 0; col < colCount; col++) {
        const seat = seats[row * colCount + col];

        cols.push(
          <div
            key={seat.id}
            onClick={() => !seat.isOccupied && handleSeatClick(seat.id)}
            className={`w-16 h-16 flex items-center justify-center mx-2 my-2 rounded-md cursor-pointer 
              ${seat.isOccupied ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'} 
              text-white font-semibold`}
            title={seat.isOccupied ? 'Occupied' : 'Available'}
          >
            <span className="text-sm">{seat.seatNumber}</span>
          </div>
        );
      }

      rows.push(
        <div key={row} className="flex justify-center mb-4">
          {cols}
        </div>
      );
    }

    return rows;
  };

  return (
    <div>
    <Navbar/>
    <SeatNavbar/>
   <CircularSeat timeSlot="Morning"/>
    </div>
  );
};

export default SeatChart;
