import React, { useState, useRef } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Shells from "../bookshell/books/Shells";

const Attendance = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const tableRef = useRef(null);

  const handleInputChange = (index, field, value) => {
    const updatedList = [...attendanceList];
    updatedList[index][field] = value;
    setAttendanceList(updatedList);
  };

  const addRow = () => {
    const newRow = { id: generateUniqueId(), name: "", timeIn: "", timeOut: "", sign: "" };
    setAttendanceList([...attendanceList, newRow]);
  };

  const removeRow = (id) => {
    const updatedList = attendanceList.filter(row => row.id !== id ); // Filter by ID to remove row
    setAttendanceList(updatedList);
  };

  // Function to generate unique IDs based on the current year and an index
  const generateUniqueId = () => {
    const currentYear = new Date().getFullYear(); // Get the current year
    const index = attendanceList.length + 1; // Use the next index to generate unique ID
    return `${currentYear}_प${index}`; // Example format: 2025_प1
  };

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

  const saveAttendance = async () => {
    console.log("Attendance data being sent:", attendanceList);

    try {
      const response = await fetch("http://localhost:8000/api/save-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendanceList }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Attendance saved successfully!");
      } else {
        alert(`Failed to save attendance: ${data.message}`);
      }
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  const total = attendanceList.length;
  const present = attendanceList.filter((entry) => entry.sign === "Present").length;
  const absent = total - present;

  return (
    <>
      <div className="max-w-full mx-auto bg-white p-3 sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4">Library Attendance</h2>

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

        <div className="overflow-x-auto relative" ref={tableRef} style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="w-full table-auto border-collapse border border-gray-300 text-xs sm:text-sm">
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

            <tbody>
              {attendanceList.map((entry, index) => (
                <tr key={entry.id} className="hover:bg-gray-50">
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
                      disabled
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

                  <td className="py-2 px-3 border text-center">
                    <button
                      onClick={() => toggleAttendance(index)}
                      aria-label={`Mark ${entry.name} as ${entry.sign === 'Present' ? 'Absent' : 'Present'}`}
                      className={`px-2 py-1 rounded ${entry.sign === "Present" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                    >
                      {entry.sign || "Absent"}
                    </button>
                  </td>

                  <td className="py-2 px-3 border text-center">
                    <button
                      onClick={() => removeRow(entry.id)} // Ensure ID is passed correctly
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

        <div className="mt-3 sm:mt-4 flex justify-center">
          <button
            onClick={addRow}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto"
          >
            Add Row
          </button>
        </div>

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

          <div className="mt-6 flex justify-center">
            <button
              onClick={saveAttendance}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Submit Attendance
            </button>
          </div>
          <Shells/>
        </div>
      </div>
    </>
  );
};

export default Attendance;
