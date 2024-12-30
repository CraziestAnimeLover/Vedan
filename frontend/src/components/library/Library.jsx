import React, { useState } from 'react';
import Librarystudent from './librarystudent/Librarystudent';
import Libraryadmin from './libraryadmin/Libraryadmin';
import Navbar from '../shared/Navbar';

const Library = () => {
  const [availability, setAvailability] = useState([
    { time: '10:00 AM - 11:00 AM', available: true },
    { time: '11:00 AM - 12:00 PM', available: true },
    { time: '12:00 PM - 01:00 PM', available: true },
    { time: '01:00 PM - 02:00 PM', available: false },
  ]);

  const [activeComponent, setActiveComponent] = useState(''); // Tracks which component to display

  const handleStudentSubmit = (data) => {
    console.log('Student Booking Data:', data);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-gray-500 to-indigo-600 flex flex-col items-center justify-center gap-8 p-6">
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveComponent('admin')}
          className={`px-6 py-2 text-white font-bold rounded ${
            activeComponent === 'admin' ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'
          }`}
        >
          Admin Panel
        </button>
        <button
          onClick={() => setActiveComponent('student')}
          className={`px-6 py-2 text-white font-bold rounded ${
            activeComponent === 'student' ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-700'
          }`}
        >
          Student Booking
        </button>
      </div>

      {/* Conditional Rendering of Components */}
      {activeComponent === 'admin' && (
        <Libraryadmin availability={availability} updateAvailability={setAvailability} />
      )}
      {activeComponent === 'student' && (
        <Librarystudent availability={availability} onSubmit={handleStudentSubmit} />
      )}
    </div>
    </>
  );
};

export default Library;
