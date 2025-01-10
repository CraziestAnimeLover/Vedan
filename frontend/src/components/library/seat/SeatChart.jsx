import React, { useState } from 'react';
import Navbar from '../../shared/Navbar';

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
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Library Seat Chart</h2>

      <div className="flex flex-col items-center">
        {renderSeatLayout()}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Click on available seats to book them. Seats that are occupied are marked in grey.</p>
      </div>

      <div className="mt-6 text-center">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none">
          Book Selected Seats
        </button>
      </div>
    </div>
    </div>
  );
};

export default SeatChart;
