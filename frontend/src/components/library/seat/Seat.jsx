import React, { useState, useEffect } from "react";

const Seat = ({ timeSlot }) => {
  const [seats, setSeats] = useState([]);

  // Function to generate a seat matrix based on time slot
  const generateSeatMatrix = (timeSlot) => {
    const rows = 5;
    const cols = 5;
    const matrix = [];
    let seatNumber = 1; // Start seat numbering from 1

    // Generate seats for the grid with sequential seat numbers
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const seat = {
          number: seatNumber++, // Assign sequential seat numbers
          occupied: false, // Initially, all seats are available
        };

        // Set seats as occupied based on timeSlot
        if (timeSlot === 'Morning' && i === 0) {
          seat.occupied = true; // Occupied seats for morning in row 0
        } else if (timeSlot === 'Afternoon' && j === 0) {
          seat.occupied = true; // Occupied seats for afternoon in column 0
        } else if (timeSlot === 'Evening' && i === 4) {
          seat.occupied = true; // Occupied seats for evening in row 4
        } else if (timeSlot === 'Night' && j === 4) {
          seat.occupied = true; // Occupied seats for night in column 4
        }

        row.push(seat); // Add the seat to the row
      }
      matrix.push(row); // Add the row to the matrix
    }
    return matrix;
  };

  // Whenever the time slot changes, regenerate the seat matrix
  useEffect(() => {
    setSeats(generateSeatMatrix(timeSlot));
  }, [timeSlot]);

  // Handle seat toggle (toggle occupied state)
  const toggleSeat = (row, col) => {
    const updatedSeats = [...seats];
    updatedSeats[row][col].occupied = !updatedSeats[row][col].occupied; // Toggle occupied state
    setSeats(updatedSeats);
  };

  // Add a new row
  const addRow = () => {
    const lastSeatNumber = seats[seats.length - 1][seats[0].length - 1].number; // Get the last seat number
    const newRow = Array(seats[0].length).fill(null).map((_, index) => ({
      number: lastSeatNumber + index + 1, // Continue numbering from last seat
      occupied: false,
    }));
    setSeats([...seats, newRow]);
  };

  // Remove the last row
  const removeRow = () => {
    if (seats.length > 1) {
      setSeats(seats.slice(0, seats.length - 1));
    }
  };

  // Add a new column
  const addColumn = () => {
    let lastSeatNumber = seats[0][seats[0].length - 1].number; // Get the last seat number from the first row
    const updatedSeats = seats.map(row => {
      const newSeat = {
        number: lastSeatNumber + 1, // New seat number for the column
        occupied: false, // Initially the new seat is available
      };
      lastSeatNumber = newSeat.number; // Update the last seat number for the next iteration
      return [...row, newSeat]; // Add the new seat to the row
    });
    setSeats(updatedSeats);
  };

  // Calculate total and allotted (occupied) seats
  const totalSeats = seats.length * (seats[0] ? seats[0].length : 0); // Total seats = rows * columns
  const allottedSeats = seats.flat().filter(seat => seat.occupied).length; // Count occupied seats

  // Check if seats have been generated before rendering
  if (seats.length === 0) {
    return <p>Loading seat layout...</p>;
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">{timeSlot} Seat Layout</h3>
      <p className="text-lg mb-4">Seats available for {timeSlot}.</p>

      {/* Display Total and Allotted Seats in Card Style */}
      <div className="flex gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-1/2 text-center">
          <p className="text-xl font-semibold">Total Seats</p>
          <p className="text-4xl font-bold">{totalSeats}</p>
        </div>
        <div className={`p-6 rounded-lg shadow-lg w-1/2 text-center ${allottedSeats > 0 ? "bg-red-500" : "bg-green-500"} text-white`}>
          <p className="text-xl font-semibold">Allotted (Occupied) Seats</p>
          <p className="text-4xl font-bold">{allottedSeats}</p>
        </div>
      </div>

      {/* Controls to Add/Remove Rows */}
      <div className="flex gap-4 mb-4">
        <button onClick={addRow} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Add Row</button>
        <button onClick={removeRow} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">Remove Row</button>
        <button onClick={addColumn} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Add Column</button>
      </div>

      {/* Seat Table */}
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border">#</th>
            {Array.from({ length: seats[0].length }).map((_, colIndex) => (
              <th key={colIndex} className="py-2 px-4 border">
                Col {colIndex + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {seats.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="py-2 px-4 border">{`Row ${rowIndex + 1}`}</td>
              {row.map((seat, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-2 px-4 border cursor-pointer ${seat.occupied ? "bg-red-200" : "bg-green-200"}`}
                  onClick={() => toggleSeat(rowIndex, colIndex)}
                >
                  {seat.number}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Seat;
