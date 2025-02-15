import React, { useState } from "react";

const FeesTable = () => {
  const [data, setData] = useState([
    { id: 1, month: "January", fees: "$100", given: "Yes", remark: "Paid" },
    { id: 2, month: "February", fees: "$120", given: "No", remark: "Pending" },
  ]);

  const handleInputChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  return (
    <div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">S.No.</th>
            <th className="border px-4 py-2">Month</th>
            <th className="border px-4 py-2">Fees</th>
            <th className="border px-4 py-2">Given</th>
            <th className="border px-4 py-2">Remark</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.month}
                  onChange={(e) => handleInputChange(row.id, "month", e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-center"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.fees}
                  onChange={(e) => handleInputChange(row.id, "fees", e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-center"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.given}
                  onChange={(e) => handleInputChange(row.id, "given", e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-center"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.remark}
                  onChange={(e) => handleInputChange(row.id, "remark", e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-center"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeesTable;
