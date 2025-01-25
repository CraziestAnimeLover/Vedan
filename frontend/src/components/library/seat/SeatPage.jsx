import React, { useState } from "react";
import SeatForm from "./SeatForm";
import axios from "axios";

const SeatPage = () => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  // Fetch all booked seats
  const fetchBookedSeats = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/booked-seats");
      setBookedSeats(response.data); // Assuming the API returns a list of booked seats
    } catch (error) {
      console.error("Failed to fetch booked seats", error);
    }
  };

  // Open Seat Booking Form
  const openForm = (seatNumber) => {
    setSelectedSeat(seatNumber);
    setIsFormOpen(true);
  };

  // Close Seat Booking Form
  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedSeat(null);
  };

  // Update booked seats after booking
  const updateBookedSeats = () => {
    fetchBookedSeats(); // Re-fetch the updated list of booked seats
  };

  return (
    <div className="container">
      <h2 className="text-center font-bold text-xl mb-4">Available Seats</h2>
      
      <div className="seats-list">
        {/* Example seat list */}
        {["R1C1", "R1C2", "R1C3", "R2C1", "R2C2"].map((seatNumber) => (
          <div key={seatNumber} className="seat">
            <p>Seat {seatNumber}</p>
            <button onClick={() => openForm(seatNumber)} className="bg-blue-500 text-white p-2 rounded">
              Book Seat
            </button>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <SeatForm seatNumber={selectedSeat} onClose={closeForm} onBookingSuccess={updateBookedSeats} />
      )}

      <div className="booked-seats">
        <h3 className="text-xl font-bold mb-4">Booked Seats</h3>
        <ul>
          {bookedSeats.map((seat) => (
            <li key={seat.number}>
              Seat {seat.number} - {seat.memberName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SeatPage;
