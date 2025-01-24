import React, { useState } from "react";
import SeatForm from "./SeatForm"; // Import SeatForm

const CircularSeat = ({ timeSlot }) => {
  const [tables, setTables] = useState([
    { id: 1, seats: 6, size: 50 }, // Default table setup
  ]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Add a new table
  const handleAddTable = () => {
    const newTableId = tables.length + 1;
    setTables([...tables, { id: newTableId, seats: 6, size: 50 }]);
  };

  // Remove a table
  const handleRemoveTable = () => {
    if (tables.length > 1) {
      setTables(tables.slice(0, -1));
    }
  };

  // Add a seat to a table
  const handleAddSeat = (tableId) => {
    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, seats: table.seats + 1 } : table
      )
    );
  };

  // Remove a seat from a table
  const handleRemoveSeat = (tableId) => {
    setTables(
      tables.map((table) =>
        table.id === tableId && table.seats > 1
          ? { ...table, seats: table.seats - 1 }
          : table
      )
    );
  };

  // Handle seat click and show the form in a modal
  const handleSeatClick = (tableId, seatNumber) => {
    setSelectedSeat({ tableId, seatNumber });
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Hide the modal
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Layout ({timeSlot})</h3>

      {/* Add/Remove Table Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={handleAddTable}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Table
        </button>
        <button
          onClick={handleRemoveTable}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove Table
        </button>
      </div>

      {/* Table Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
        {tables.map((table) => (
          <div
            key={table.id}
            className="relative flex flex-col justify-center items-center border rounded-lg p-4"
            style={{ height: "400px", width: "400px" }}
          >
            {/* Add/Remove Seat Buttons for each table */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 space-x-2">
              <button
                onClick={() => handleAddSeat(table.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Add Seat
              </button>
              <button
                onClick={() => handleRemoveSeat(table.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove Seat
              </button>
            </div>

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                width: `80px`,
                height: `80px`,
                backgroundColor: "brown",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Table {table.id}
            </div>

            {/* Seats */}
            {[...Array(table.seats)].map((_, index) => {
              const angle = (index / table.seats) * 2 * Math.PI;
              const radius = 120 + table.size / 4;
              const x = radius * Math.cos(angle) + 200;
              const y = radius * Math.sin(angle) + 200;

              return (
                <div
                  key={index}
                  onClick={() => handleSeatClick(table.id, index + 1)} // Pass the table and seat number
                  style={{
                    position: "absolute",
                    top: `${y}px`,
                    left: `${x}px`,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: "green",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Seat Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center mt-24">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h4 className="text-xl font-bold mt-8 mb-4">
              Table {selectedSeat.tableId} - Seat {selectedSeat.seatNumber}
            </h4>
            <SeatForm
              tableId={selectedSeat.tableId}
              seatNumber={selectedSeat.seatNumber}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularSeat;
