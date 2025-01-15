import React, { useState } from 'react';
import Seat from './Seat'; // Import the Seat component

const SeatNavbar = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('Morning'); // Default to 'Morning'

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div>
      {/* Navbar with time slots */}
      <nav className="bg-gray-800 text-white p-3 flex justify-around">
        <button
          onClick={() => handleTimeSlotClick('Morning')}
          className={`px-4 py-2 rounded ${selectedTimeSlot === 'Morning' ? 'bg-blue-500' : 'bg-gray-600'}`}
        >
          Morning
        </button>
        <button
          onClick={() => handleTimeSlotClick('Afternoon')}
          className={`px-4 py-2 rounded ${selectedTimeSlot === 'Afternoon' ? 'bg-blue-500' : 'bg-gray-600'}`}
        >
          Afternoon
        </button>
        <button
          onClick={() => handleTimeSlotClick('Evening')}
          className={`px-4 py-2 rounded ${selectedTimeSlot === 'Evening' ? 'bg-blue-500' : 'bg-gray-600'}`}
        >
          Evening
        </button>
        <button
          onClick={() => handleTimeSlotClick('Night')}
          className={`px-4 py-2 rounded ${selectedTimeSlot === 'Night' ? 'bg-blue-500' : 'bg-gray-600'}`}
        >
          Night
        </button>
        <button
          onClick={() => handleTimeSlotClick('Full day')}
          className={`px-4 py-2 rounded ${selectedTimeSlot === 'Full day' ? 'bg-blue-500' : 'bg-gray-600'}`}
        >
          Full day
        </button>
      </nav>

      {/* Conditionally render Seat component based on selected time slot */}
      <Seat timeSlot={selectedTimeSlot} />
    </div>
  );
};

export default SeatNavbar;
