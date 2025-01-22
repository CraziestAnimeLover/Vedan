import React, { useState, useEffect } from "react";
import SeatForm from "./SeatForm";

const Seat = ({ timeSlot }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null); // For the modal
  const [rowCount, setRowCount] = useState(5);  // Initial rows count
  const [colCount, setColCount] = useState(5);  // Initial columns count

  const generateSeatMatrix = (timeSlot, rows, cols) => {
    const matrix = [];
    let seatNumber = 1;

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const seat = {
          number: seatNumber++,
          occupied: false,
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

  const toggleSeat = (row, col) => {
    const updatedSeats = [...seats];
    updatedSeats[row][col].occupied = !updatedSeats[row][col].occupied;
    setSeats(updatedSeats);
  };

  const handleSeatClick = (rowIndex, colIndex) => {
    setSelectedSeat(seats[rowIndex][colIndex]); // Set selected seat for the form
  };

  const closeForm = () => {
    setSelectedSeat(null); // Reset selectedSeat to close the modal
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

      <div className="flex gap-6 mb-6 flex-wrap sm:flex-nowrap">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg w-full sm:w-1/2 text-center mb-4 sm:mb-0">
          <p className="text-xl font-semibold">Total Seats</p>
          <p className="text-4xl font-bold">{totalSeats}</p>
        </div>
        <div
          className={`p-6 rounded-lg shadow-lg w-full sm:w-1/2 text-center ${
            allottedSeats > 0 ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          <p className="text-xl font-semibold">Allotted (Occupied) Seats</p>
          <p className="text-4xl font-bold">{allottedSeats}</p>
        </div>
      </div>

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

      <table className="table-auto border-collapse border border-gray-300 w-full overflow-x-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border"></th>
            {Array.from({ length: colCount }).map((_, colIndex) => (
              <th key={colIndex} className="py-2 px-4 border">
                {/* Col {colIndex + 1} */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {seats.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="py-2 px-4 border">{` `}</td>
              {row.map((seat, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-2 px-4 border cursor-pointer ${
                    seat.occupied ? "bg-red-200" : "bg-green-200"
                  }`}
                  onClick={() => handleSeatClick(rowIndex, colIndex)}
                >
                  {seat.number}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSeat && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* Background Overlay with fade-in animation */}
          <div
            className="fixed inset-0 bg-gray-500/75 transition-opacity opacity-0 animate-fade-in"
            aria-hidden="true"
          ></div>

          {/* Modal Content with slide-up animation */}
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div
                className="relative transform overflow-hidden rounded-lg bg-gray-100 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-slide-up"
              >
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
