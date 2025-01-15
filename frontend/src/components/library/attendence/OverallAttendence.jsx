import React, { useState, useRef } from "react";

const OverallAttendance = () => {
  const [attendanceList, setAttendanceList] = useState([
    { id: "001", name: "Sunny", present: true, timeIn: "9:00 AM", timeOut: "5:00 PM" },
    { id: "002", name: "Vinay", present: false, timeIn: "9:30 AM", timeOut: "5:30 PM" },
    { id: "003", name: "Kapil", present: true, timeIn: "10:00 AM", timeOut: "6:00 PM" },
  ]);
  const [isScrollingUp, setIsScrollingUp] = useState(false); // State to toggle scroll direction
  const tableRef = useRef(null); // Ref for the table

  const handleInputChange = (index, field, value) => {
    const updatedList = [...attendanceList];
    updatedList[index][field] = value;
    setAttendanceList(updatedList);
  };

  const toggleAttendance = (index) => {
    const updatedList = [...attendanceList];
    updatedList[index].present = !updatedList[index].present;
    setAttendanceList(updatedList);
  };

  const addRow = () => {
    const newId = (attendanceList.length + 1).toString().padStart(3, "0");
    const newRow = { id: newId, name: "", present: false, timeIn: "", timeOut: "" };
    setAttendanceList([...attendanceList, newRow]);
  };

  const removeRow = (index) => {
    const updatedList = attendanceList.filter((_, i) => i !== index);
    const reassignedList = updatedList.map((item, idx) => ({
      ...item,
      id: (idx + 1).toString().padStart(3, "0"), // Reassign IDs
    }));
    setAttendanceList(reassignedList);
  };

  const total = attendanceList.length;
  const present = attendanceList.filter((entry) => entry.present).length;
  const absent = total - present;

  // Scroll toggle function
  const toggleScroll = () => {
    if (tableRef.current) {
      if (isScrollingUp) {
        tableRef.current.scrollTop = 0; // Scroll to top
      } else {
        tableRef.current.scrollTop = tableRef.current.scrollHeight; // Scroll to bottom
      }
      setIsScrollingUp(!isScrollingUp); // Toggle direction
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Overall Attendance</h2>
      <div className="overflow-x-auto" ref={tableRef}>
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">SNo.</th>
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Time In</th>
              <th className="py-2 px-4 border">Time Out</th>
              <th className="py-2 px-4 border">Attendance</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{entry.id}</td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={entry.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                    className="w-full p-1 border rounded bg-transparent focus:outline-none"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={entry.timeIn}
                    onChange={(e) => handleInputChange(index, "timeIn", e.target.value)}
                    className="w-full p-1 border rounded bg-transparent focus:outline-none"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={entry.timeOut}
                    onChange={(e) => handleInputChange(index, "timeOut", e.target.value)}
                    className="w-full p-1 border rounded bg-transparent focus:outline-none"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <button onClick={() => toggleAttendance(index)} className="text-blue-500">
                    {entry.present ? "Present" : "Absent"}
                  </button>
                </td>
                <td className="py-2 px-4 border">
                  <button onClick={() => removeRow(index)} className="text-red-500">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100">
              <td colSpan="5" className="py-2 px-4 border text-right font-bold">Total</td>
              <td className="py-2 px-4 border">{total}</td>
              <td className="py-2 px-4 border"></td>
            </tr>
            <tr className="bg-gray-100">
              <td colSpan="5" className="py-2 px-4 border text-right font-bold">Present</td>
              <td className="py-2 px-4 border">{present}</td>
              <td className="py-2 px-4 border"></td>
            </tr>
            <tr className="bg-gray-100">
              <td colSpan="5" className="py-2 px-4 border text-right font-bold">Absent</td>
              <td className="py-2 px-4 border">{absent}</td>
              <td className="py-2 px-4 border"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button
        onClick={addRow}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto"
      >
        Add Row
      </button>
      <button
        onClick={toggleScroll}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
      >
        Toggle Scroll
      </button>
    </div>
  );
};

export default OverallAttendance;
