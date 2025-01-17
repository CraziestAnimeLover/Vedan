import React, { useState } from "react";

const FeeDetails = () => {
  const [tableData, setTableData] = useState({
    Monthly: { Student: "", Fees: "" },
    Anyplan: { Student: "", Fees: "" },
  });

  // Handle changes in table cells
  const handleChange = (row, col, value) => {
    setTableData((prevData) => ({
      ...prevData,
      [row]: {
        ...prevData[row],
        [col]: value,
      },
    }));
  };

  // Handle update button click
  const handleUpdate = (row) => {
    console.log(`Updated data for ${row}:`, tableData[row]);
    // You can perform any other operations here, such as sending the data to an API or updating the database
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Fee Details</h2>
      <table className="table-auto w-full border-collapse shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border p-4 text-left font-medium">Month</th>
            <th className="border p-4 text-center font-medium">Student</th>
            <th className="border p-4 text-center font-medium">Fees</th>
            <th className="border p-4 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {["Monthly", "Anyplan"].map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
            >
              <td className="border p-4 text-center text-gray-600">{row}</td>
              {["Student", "Fees"].map((col, colIndex) => (
                <td key={colIndex} className="border p-4">
                  <input
                    type="text"
                    value={tableData[row][col]}
                    onChange={(e) => handleChange(row, col, e.target.value)}
                    className="w-full border p-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </td>
              ))}
              <td className="border p-4 text-center">
                <button
                  onClick={() => handleUpdate(row)}
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeeDetails;
