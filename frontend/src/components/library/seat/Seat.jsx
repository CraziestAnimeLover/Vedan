import React, { useState, useEffect } from "react";
import SeatForm from "./SeatForm";

const Seat = ({ timeSlot }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [rowCount, setRowCount] = useState(5);
  const [colCount, setColCount] = useState(5);
  const [searchTerm, setSearchTerm] = useState(""); // State for member search
  const [foundSeat, setFoundSeat] = useState(null); // State for found seat

  const generateSeatMatrix = (timeSlot, rows, cols) => {
    const matrix = [];
    let seatNumber = 1;

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const seat = {
          number: seatNumber++,
          occupied: false,
          memberName: null, // Assume you can store the member name here
        };

        if (timeSlot === "Morning" && i === 0) {
          seat.occupied = true;
        } else if (timeSlot === "Afternoon" && j === 0) {
          seat.occupied = true;
        } else if (timeSlot === "Evening" && i === 4) {
          seat.occupied = true;
        } else if (timeSlot === "Night" && j === 4) {
          seat.occupied = true;
        }

        row.push(seat);
      }
      matrix.push(row);
    }
    return matrix;
  };

  useEffect(() => {
    setSeats(generateSeatMatrix(timeSlot, rowCount, colCount));
  }, [timeSlot, rowCount, colCount]);

  const handleSearch = () => {
    const found = seats.flat().find((seat) => seat.memberName === searchTerm);
    setFoundSeat(found || null); // Set found seat or null if not found
  };

  const handleSeatClick = (rowIndex, colIndex) => {
    setSelectedSeat(seats[rowIndex][colIndex]);
  };

  const closeForm = () => {
    setSelectedSeat(null);
  };

  const totalSeats = seats?.length * (seats[0]?.length || 0);
  const allottedSeats = seats?.flat().filter((seat) => seat.occupied).length || 0;

  // Handle adding/removing rows and columns
  const handleAddRow = () => {
    setRowCount((prevRowCount) => prevRowCount + 1);
  };

  const handleRemoveRow = () => {
    if (rowCount > 1) setRowCount((prevRowCount) => prevRowCount - 1);
  };

  const handleAddColumn = () => {
    setColCount((prevColCount) => prevColCount + 1);
  };

  const handleRemoveColumn = () => {
    if (colCount > 1) setColCount((prevColCount) => prevColCount - 1);
  };

  if (!seats || seats.length === 0) {
    return <p>Loading seat layout...</p>;
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">{timeSlot} Seat Layout</h3>
      <p className="text-lg mb-4">Seats available for {timeSlot}.</p>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Enter Member ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Display Search Result */}
      {foundSeat && (
        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg mb-6">
          <p className="text-xl font-semibold">Seat Details</p>
          <p>Seat Number: {foundSeat.number}</p>
          <p>Status: {foundSeat.occupied ? "Occupied" : "Available"}</p>
          <p>Booked By: {foundSeat.memberName || "N/A"}</p>
        </div>
      )}

      {/* Information boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-full text-center">
          <p className="text-xl font-semibold">Total Seats</p>
          <p className="text-4xl font-bold">{totalSeats}</p>
        </div>
        <div
          className={`p-6 rounded-lg shadow-lg w-full text-center ${allottedSeats > 0 ? "bg-red-500" : "bg-green-500"} text-white`}
        >
          <p className="text-xl font-semibold">Allotted (Occupied) Seats</p>
          <p className="text-4xl font-bold">{allottedSeats}</p>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center mb-6 flex-wrap gap-4">
        <button
          onClick={handleAddRow}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Add Row
        </button>
        <button
          onClick={handleRemoveRow}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
        >
          Remove Row
        </button>
        <button
          onClick={handleAddColumn}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
        >
          Add Column
        </button>
        <button
          onClick={handleRemoveColumn}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
        >
          Remove Column
        </button>
      </div>

      {/* Seat Layout Table */}
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <tbody>
            {seats.map((row, rowIndex) => {
              if (row.some((seat) => seat.number !== undefined)) {
                return (
                  <tr key={rowIndex}>
                    {row.map((seat, colIndex) => (
                      seat.number !== undefined && (
                        <td
                          key={colIndex}
                          className={`py-2 px-4 border cursor-pointer ${seat.occupied ? "bg-red-200" : "bg-green-200"}`}
                          onClick={() => handleSeatClick(rowIndex, colIndex)}
                        >
                          {seat.number}
                        </td>
                      )
                    ))}
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {selectedSeat && (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity opacity-0 animate-fade-in" aria-hidden="true"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-gray-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-slide-up">
                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <SeatForm seatNumber={selectedSeat.number} onClose={closeForm} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seat;
