import React, { useState } from "react";
import FeeDetails from "./FeeDetails";
import Navbar from "../../shared/Navbar";


const Account = () => {
  // List of months
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Initial data for the table
  const initialTableData = months.reduce((acc, month) => {
    acc[month] = { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" };
    return acc;
  }, {});

  const [tableData, setTableData] = useState(initialTableData);

  // Handle changes in table cells
  const handleChange = (month, col, value) => {
    const sanitizedValue = col !== "Enquiry" && col !== "Applied" && col !== "Learning"
      ? value.replace(/[^0-9.-]/g, "")
      : value;
    setTableData((prevData) => ({
      ...prevData,
      [month]: {
        ...prevData[month],
        [col]: sanitizedValue,
      },
    }));
  };

  // Handle update button click
  const handleUpdate = async (month) => {
    try {
      const dataToSend = { month, data: { ...tableData[month] } };
  
      // Check that P/L is defined
      if (!dataToSend.data["P/L"]) {
        dataToSend.data["P/L"] = "0"; // Ensure P/L field has a value
      }
  
      console.log('Sending data:', JSON.stringify(dataToSend));
  
      const response = await fetch(`http://localhost:8000/api/update-fees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(`Failed to update: ${errorDetails.message || 'Unknown error'}`);
      }
  
      console.log(`Data for ${month} updated successfully.`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  
  
  

  // Reusable TableRow component
  const TableRow = ({ month, data }) => (
    <tr className={`bg-${months.indexOf(month) % 2 === 0 ? "gray-50" : "white"}`}>
      <td className="border p-4 text-center text-gray-600">{month}</td>
      {Object.keys(data).map((col, index) => (
        <td key={index} className="border p-4">
          <input
            type="text"
            value={data[col]}
            onChange={(e) => handleChange(month, col, e.target.value)}
            className="w-full border p-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Edit ${col} for ${month}`}
          />
        </td>
      ))}
      <td className="border p-4 text-center">
        <button
          onClick={() => handleUpdate(month)}
          className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Update
        </button>
      </td>
    </tr>
  );

  return (
    <>
      <Navbar />
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto mt-8">
        <div className="pb-8">
          <FeeDetails />
        </div>
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Fee Card Maintain</h2>
        <table className="table-auto w-full border-collapse shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-4 text-left font-medium">Month</th>
              <th className="border p-4 text-center font-medium">Enquiry</th>
              <th className="border p-4 text-center font-medium">Applied</th>
              <th className="border p-4 text-center font-medium">Learning</th>
              <th className="border p-4 text-center font-medium">Fees Covered</th>
              <th className="border p-4 text-center font-medium">Left Fees</th>
              <th className="border p-4 text-center font-medium">P/L</th>
              <th className="border p-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {months.map((month) => (
              <TableRow key={month} month={month} data={tableData[month]} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Account;
