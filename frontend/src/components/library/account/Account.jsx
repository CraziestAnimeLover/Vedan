import React, { useState } from "react";
import FeeDetails from "./FeeDetails";
import Navbar from "../../shared/Navbar";

const Account = () => {
  // Initial data for the table with month names as keys
  const [tableData, setTableData] = useState({
    January: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    February: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    March: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    April: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    May: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    June: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    July: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    August: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    September: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    October: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    November: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
    December: { Enquiry: "", Applied: "", Learning: "", FeesCovered: "", LeftFees: "", "P/L": "" },
  });

  // Handle changes in table cells
  const handleChange = (month, col, value) => {
    setTableData((prevData) => ({
      ...prevData,
      [month]: {
        ...prevData[month],
        [col]: value,
      },
    }));
  };

  // Handle update button click
  const handleUpdate = (month) => {
    console.log(`Updated data for ${month}:`, tableData[month]);
    // Perform any other operations here, such as sending the data to an API or updating the database
  };

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
            {Object.keys(tableData).map((month, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="border p-4 text-center text-gray-600">{month}</td>
                {["Enquiry", "Applied", "Learning", "FeesCovered", "LeftFees", "P/L"].map((col, colIndex) => (
                  <td key={colIndex} className="border p-4">
                    <input
                      type="text"
                      value={tableData[month][col]}
                      onChange={(e) => handleChange(month, col, e.target.value)}
                      className="w-full border p-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Account;
