import React, { useState } from 'react';
import LibraryProfile from '../profile/LibraryProfile';

const Libraryadmin = ({ availability, updateAvailability }) => {
  const toggleSlotAvailability = (index) => {
    const updatedSlots = availability.map((slot, i) =>
      i === index ? { ...slot, available: !slot.available } : slot
    );
    updateAvailability(updatedSlots);
  };

  return (
    <div>
  <div className=''>
  <LibraryProfile/>
  </div>
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Admin - Manage Slots</h2>
      <ul>
        {availability.map((slot, index) => (
          <li
            key={index}
            className={`py-2 px-4 rounded mb-2 flex justify-between items-center ${
              slot.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            <span>{slot.time}</span>
            <button
              onClick={() => toggleSlotAvailability(index)}
              className="bg-gray-800 text-white py-1 px-3 rounded"
            >
              {slot.available ? 'Mark Occupied' : 'Mark Free'}
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Libraryadmin;
