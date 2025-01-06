import React, { useState } from 'react';

// Attendance Component
const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([
    { name: "Sunny", present: false, book: "Habbit", membership: "Yes" },
    { name: "Vinay", present: false, book: "Habbit", membership: "Yes" },
    { name: "Kapil", present: false, book: "Habbit", membership: "No" },
  ]);

  const toggleAttendance = (index) => {
    const updatedList = [...attendanceList];
    updatedList[index].present = !updatedList[index].present;
    setAttendanceList(updatedList);
  };

  const handleNameChange = (index, newName) => {
    const updatedList = [...attendanceList];
    updatedList[index].name = newName;
    setAttendanceList(updatedList);
  };

  const handleBookChange = (index, newBook) => {
    const updatedList = [...attendanceList];
    updatedList[index].book = newBook;
    setAttendanceList(updatedList);
  };

  // Function to toggle membership status between Yes and No
  const toggleMembership = (index) => {
    const updatedList = [...attendanceList];
    updatedList[index].membership = updatedList[index].membership === "Yes" ? "No" : "Yes";
    setAttendanceList(updatedList);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Library Attendance</h2>
      
      {/* Excel-like Table Layout */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border text-left">Name</th>
              <th className="py-2 px-4 border text-left">Attendance</th>
              <th className="py-2 px-4 border text-left">Books</th>
              <th className="py-2 px-4 border text-left">Membership</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {attendanceList.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {/* Editable Name Column */}
                <td className="py-2 px-4 border text-left">
                  <input
                    type="text"
                    value={entry.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="w-full p-1 border rounded bg-transparent focus:outline-none"
                  />
                </td>

                {/* Attendance Column with Toggle Button */}
                <td className="py-2 px-4 border text-center">
                  <button
                    onClick={() => toggleAttendance(index)}
                    className={`py-1 px-3 rounded ${
                      entry.present ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {entry.present ? 'Present' : 'Absent'}
                  </button>
                </td>

                {/* Editable Books Column */}
                <td className="py-2 px-4 border text-left">
                  <input
                    type="text"
                    value={entry.book}
                    onChange={(e) => handleBookChange(index, e.target.value)}
                    className="w-full p-1 border rounded bg-transparent focus:outline-none"
                  />
                </td>

                {/* Membership Toggle Button */}
                <td className="py-2 px-4 border text-center">
                  <button
                    onClick={() => toggleMembership(index)}
                    className={`py-1 px-3 rounded ${
                      entry.membership === "Yes" ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                    }`}
                  >
                    {entry.membership}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
