import React, { useState, useEffect } from "react";
import axios from 'axios';

const StaffSmpurn = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [rows, setRows] = useState([
    {
      id: "60c72b2f9d1e8b2d88f2e5d7",  // MongoDB ObjectId here
      name: "John Doe",
      data: Array(31).fill("-"),
      totalDays: 0,
      performedTotalP: 0,
      remark: "-",
    },
  ]);

  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  const daysInMonth = new Date(selectedYear, months.indexOf(selectedMonth) + 1, 0).getDate();

  useEffect(() => {
    // Recalculate the days when the month or year changes
    const updatedRows = [...rows];
    updatedRows.forEach((row, rowIndex) => {
      updatedRows[rowIndex].data = Array(daysInMonth).fill("-");  // Update days
    });
    setRows(updatedRows);
  }, [selectedMonth, selectedYear]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1, // Use unique id generation
        name: "",
        data: Array(daysInMonth).fill("-"),
        totalDays: 0,
        performedTotalP: 0,
        remark: "-",
      },
    ]);
  };

  const deleteRow = (rowIndex) => {
    setRows(rows.filter((_, index) => index !== rowIndex));
  };

  const toggleAttendance = (rowIndex, dayIndex) => {
    const updatedRows = [...rows];
    const currentStatus = updatedRows[rowIndex].data[dayIndex];

    if (currentStatus === "P") {
      updatedRows[rowIndex].data[dayIndex] = "A";
    } else if (currentStatus === "A") {
      updatedRows[rowIndex].data[dayIndex] = "-";
    } else {
      updatedRows[rowIndex].data[dayIndex] = "P";
    }

    updatedRows[rowIndex].totalDays = updatedRows[rowIndex].data.filter(
      (day) => day === "P" || day === "A"
    ).length;
    updatedRows[rowIndex].performedTotalP = updatedRows[rowIndex].data.filter(
      (day) => day === "P"
    ).length;

    setRows(updatedRows);
  };

  const updateRow = async (rowIndex) => {
    const rowData = rows[rowIndex];

    if (typeof rowData.id !== 'string' || rowData.id.length !== 24) {
      console.error("Error: Invalid ID or ID length not 24 characters");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/api/aharattendance/${rowData.id}`, {
        studentName: rowData.name,
        year: selectedYear,
        month: selectedMonth,
        attendanceData: rowData.data.slice(0, daysInMonth),
        totalDays: rowData.totalDays,
        performedTotalP: rowData.performedTotalP,
        remark: rowData.remark,
      });

      if (response.status === 200) {
        console.log("Attendance data sent successfully!");
      } else {
        console.error("Failed to send attendance data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const submitData = async () => {
    try {
      for (const row of rows) {
        const requestData = {
          id: row.id || new Date().getTime().toString(), // Ensure a unique ID if missing
          name: row.name || "Unknown", // Default name if empty
          timeIn: row.timeIn || "00:00", // Default time if empty
          timeOut: row.timeOut || "00:00", // Default time if empty
          studentName: row.studentName,
          year: selectedYear,
          month: selectedMonth,
          attendanceData: row.data,
          totalDays: row.totalDays ?? 0,
          performedTotalP: row.performedTotalP ?? 0,
          remark: row.remark || "-", 
        };
        
        
  
        console.log("Sending Data:", requestData); // Log the request data
  
        const response = await axios.post("http://localhost:8000/api/aharattendance", requestData);
  
        console.log("Response:", response.data);
      }
    } catch (error) {
      console.error("Error during submission:", error.response?.data || error);
    }
  };
  
  
  
  

  return (
    <div className="p-4 h-full overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <select
          className="border p-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-4">
        {months.map((month) => (
          <button
            key={month}
            className={`px-3 py-1 border rounded ${
              selectedMonth === month ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </button>
        ))}
      </div>

      <div className="overflow-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Sr No</th>
              <th className="border px-2 py-1">Name</th>
              {Array.from({ length: daysInMonth }, (_, i) => (
                <th key={i} className="border px-2 py-1">
                  {i + 1}
                </th>
              ))}
              <th className="border px-2 py-1">Total Days (P + A)</th>
              <th className="border px-2 py-1">Performed Total P</th>
              <th className="border px-2 py-1">Remark</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id}>
                <td className="border px-2 py-1">{rowIndex + 1}</td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[rowIndex].name = e.target.value;
                      setRows(updatedRows);
                    }}
                    className="border p-1 w-full"
                  />
                </td>
                {Array.from({ length: daysInMonth }, (_, dayIndex) => (
                  <td
                    key={dayIndex}
                    className="border px-2 py-1 cursor-pointer"
                    onClick={() => toggleAttendance(rowIndex, dayIndex)}
                  >
                    {row.data[dayIndex]}
                  </td>
                ))}
                <td className="border px-2 py-1">{row.totalDays}</td>
                <td className="border px-2 py-1">{row.performedTotalP}</td>
                <td className="border px-2 py-1">
                  <input
                    type="text"
                    value={row.remark}
                    onChange={(e) => {
                      const updatedRows = [...rows];
                      updatedRows[rowIndex].remark = e.target.value;
                      setRows(updatedRows);
                    }}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => updateRow(rowIndex)}
                    className="px-2 mx-2 py-1 bg-blue-500 text-white rounded mb-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteRow(rowIndex)}
                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addRow}
        className="mt-4 px-3 py-2 bg-green-500 text-white rounded"
      >
        Add Row
      </button>

      <button
        onClick={submitData}
        className="mt-4 px-3 py-2 bg-blue-500 text-white rounded"
      >
        Submit All Data
      </button>
    </div>
  );
};

export default StaffSmpurn;
