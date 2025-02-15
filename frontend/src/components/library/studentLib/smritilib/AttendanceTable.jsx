import React, { useState } from "react";

const years = ["2023", "2024", "2025", "2026"];
const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 },
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 },
];

const AttendanceTable = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState(months[1]); // Default to February
  const [attendance, setAttendance] = useState(
    Array(selectedMonth.days).fill("○")
  );

  const options = ["○", "❌", "△", "P"]; // Options: Present, Absent, Company Off, and Partial

  const handleDayClick = (dayIndex) => {
    setAttendance((prev) =>
      prev.map((day, index) =>
        index === dayIndex ? options[(options.indexOf(day) + 1) % options.length] : day
      )
    );
  };

  const handleMonthChange = (event) => {
    const month = months.find((m) => m.name === event.target.value);
    setSelectedMonth(month);
    setAttendance(Array(month.days).fill("○"));
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">Attendance Tracker</h1>
      <div className="flex gap-4 my-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white shadow-md"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <select
          value={selectedMonth.name}
          onChange={handleMonthChange}
          className="px-4 py-2 border rounded-md bg-white shadow-md"
        >
          {months.map((month) => (
            <option key={month.name} value={month.name}>{month.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-6 gap-2 p-4 bg-white shadow-lg rounded-lg w-full max-w-2xl">
        {attendance.map((status, index) => {
          const dayNumber = index + 1;
          return (
            <div
              key={dayNumber}
              className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-200"
              onClick={() => handleDayClick(index)}
            >
              <div className="font-bold text-lg">{dayNumber}</div>
              <div className="text-xl">{status}</div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-lg font-semibold flex gap-4">
        <p className="bg-green-300 px-4 py-2 mb-2 rounded-lg">
         Present: ○
        </p>
        <p className="bg-red-300 px-4 py-2 mb-2 rounded-lg">
           Absent: ❌
        </p>
        <p className="bg-yellow-300 px-4 py-2 mb-2 rounded-lg">
        Library Off: △
        </p>
      </div>
      <div className="mt-6 text-lg font-semibold">
        <p className="bg-green-300 px-4 py-2 mb-2 rounded-lg">
        ○ Present: {attendance.filter(s => s === "○" || s === "P").length}
        </p>
        <p className="bg-red-300 px-4 py-2 mb-2 rounded-lg">
          ❌ Absent: {attendance.filter(s => s === "❌" || s === "△").length}
        </p>
        
      </div>
    </div>
  );
};

export default AttendanceTable;
