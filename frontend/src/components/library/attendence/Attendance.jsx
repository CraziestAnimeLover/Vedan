import React, { useState, useRef } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([
    { id: "001", name: "Sunny", timeIn: "9:00 AM", timeOut: "5:00 PM", sign: "" },
    { id: "002", name: "Vinay", timeIn: "9:30 AM", timeOut: "5:30 PM", sign: "" },
    { id: "003", name: "Kapil", timeIn: "10:00 AM", timeOut: "6:00 PM", sign: "" },
  ]);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const tableRef = useRef(null);

  const handleInputChange = (index, field, value) => {
    const updatedList = [...attendanceList];
    updatedList[index][field] = value;
    setAttendanceList(updatedList);
  };

  const addRow = () => {
    const newRow = { id: "", name: "", timeIn: "", timeOut: "", sign: "" };
    setAttendanceList([...attendanceList, newRow]);
  };

  const removeRow = (index) => {
    const updatedList = attendanceList.filter((_, i) => i !== index);
    setAttendanceList(updatedList);
  };

  // Toggle attendance (Present/Absent)
  const toggleAttendance = (index) => {
    const updatedList = [...attendanceList];
    const currentSign = updatedList[index].sign;
    updatedList[index].sign = currentSign === "Present" ? "Absent" : "Present";
    setAttendanceList(updatedList);
  };

  const toggleScroll = () => {
    if (tableRef.current) {
      if (isScrollingUp) {
        tableRef.current.scrollTop = 0;
      } else {
        tableRef.current.scrollTop = tableRef.current.scrollHeight;
      }
      setIsScrollingUp(!isScrollingUp);
    }
  };

  const total = attendanceList.length;
  const present = attendanceList.filter((entry) => entry.sign === "Present").length;
  const absent = total - present;

  return (
    <>
      <div className="max-w-full mx-auto bg-white p-3 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">Library Attendance</h2>

        {/* Scroll Button (placed above the table) */}
        {attendanceList.length >= 10 && (
          <div className="gap-4 mb-4">
            <button
              onClick={toggleScroll}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              {isScrollingUp ? <FaArrowUp /> : <FaArrowDown />}
            </button>
          </div>
        )}

        {/* Table Container */}
        <div className="overflow-x-auto relative" ref={tableRef} style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="w-full table-auto border-collapse border border-gray-300 text-xs sm:text-sm">
            {/* Table Header */}
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 border">SNo.</th>
                <th className="py-2 px-3 border">Student Name</th>
                <th className="py-2 px-3 border">ID</th>
                <th className="py-2 px-3 border">Time In</th>
                <th className="py-2 px-3 border">Time Out</th>
                <th className="py-2 px-3 border">Sign</th>
                <th className="py-2 px-3 border">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {attendanceList.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-3 border text-center">{index + 1}</td>
                  <td className="py-2 px-3 border">
                    <input
                      type="text"
                      value={entry.name}
                      onChange={(e) => handleInputChange(index, "name", e.target.value)}
                      className="w-full p-1 border rounded bg-transparent focus:outline-none text-xs sm:text-sm"
                    />
                  </td>
                  <td className="py-2 px-3 border">
                    <input
                      type="text"
                      value={entry.id}
                      onChange={(e) => handleInputChange(index, "id", e.target.value)}
                      className="w-full p-1 border rounded bg-transparent focus:outline-none text-xs sm:text-sm"
                    />
                  </td>
                  <td className="py-2 px-3 border">
                    <input
                      type="text"
                      value={entry.timeIn}
                      onChange={(e) => handleInputChange(index, "timeIn", e.target.value)}
                      className="w-full p-1 border rounded bg-transparent focus:outline-none text-xs sm:text-sm"
                    />
                  </td>
                  <td className="py-2 px-3 border">
                    <input
                      type="text"
                      value={entry.timeOut}
                      onChange={(e) => handleInputChange(index, "timeOut", e.target.value)}
                      className="w-full p-1 border rounded bg-transparent focus:outline-none text-xs sm:text-sm"
                    />
                  </td>

                  {/* Attendance Sign (Present / Absent) */}
                  <td className="py-2 px-3 border text-center">
                    <button
                      onClick={() => toggleAttendance(index)}
                      className={`px-2 py-1 rounded ${
                        entry.sign === "Present" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {entry.sign || "Absent"}
                    </button>
                  </td>

                  {/* Remove Row Button */}
                  <td className="py-2 px-3 border text-center">
                    <button
                      onClick={() => removeRow(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 text-xs sm:text-sm"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Row Button */}
        <div className="mt-3 sm:mt-4 flex justify-center">
          <button
            onClick={addRow}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Add Row
          </button>
        </div>

        {/* Present, Absent, Total Summary */}
        <div className="mt-6 bg-gray-100 p-4 rounded-md">
          <h3 className="font-bold text-lg">Attendance Summary</h3>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div className="text-center">
              <span className="text-gray-600">Total</span>
              <p className="text-xl font-semibold">{total}</p>
            </div>
            <div className="text-center">
              <span className="text-gray-600">Present</span>
              <p className="text-xl font-semibold">{present}</p>
            </div>
            <div className="text-center">
              <span className="text-gray-600">Absent</span>
              <p className="text-xl font-semibold">{absent}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
