import React, { useState } from "react";

const AharPackage = () => {
  const [packages, setPackages] = useState([
    { id: 1, name: "", range: "", fees: "", save: "", remarks: "" },
  ]);
  const [showTable, setShowTable] = useState(false);

  const handleInputChange = (index, field, value) => {
    setPackages((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addPackage = () => {
    setPackages([
      ...packages,
      { id: packages.length + 1, name: "", range: "", fees: "", save: "", remarks: "" },
    ]);
  };

  const removePackage = (index) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const updatePackage = () => {
    alert("Package updated successfully! ✅");
    setShowTable(false); // Hide table and show card after updating
  };

  return (
    <div className="p-4 flex flex-col items-center w-full relative">
      {/* Toggle Button */}
      <button
        onClick={() => setShowTable(!showTable)}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded shadow-md"
      >
        {showTable ? "Show Cards" : "Show Table"}
      </button>

      <h2 className="text-lg font-semibold mb-4 text-center">Package Details</h2>

      {showTable ? (
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-sm">
                <th className="border p-2 w-1/12">Sr. No</th>
                <th className="border p-2 w-1/5">Name</th>
                <th className="border p-2 w-1/6">Range</th>
                <th className="border p-2 w-1/6">Fees</th>
                <th className="border p-2 w-1/6">You Save</th>
                <th className="border p-2 w-1/6">Remarks</th>
                <th className="border p-2 w-1/5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((row, index) => (
                <tr key={row.id} className="text-sm">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) => handleInputChange(index, "name", e.target.value)}
                      className="border p-1 w-full text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.range}
                      onChange={(e) => handleInputChange(index, "range", e.target.value)}
                      className="border p-1 w-full text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.fees}
                      onChange={(e) => handleInputChange(index, "fees", e.target.value)}
                      className="border p-1 w-full text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.save}
                      onChange={(e) => handleInputChange(index, "save", e.target.value)}
                      className="border p-1 w-full text-sm"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.remarks}
                      onChange={(e) => handleInputChange(index, "remarks", e.target.value)}
                      className="border p-1 w-full text-sm"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        onClick={updatePackage}
                        className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => removePackage(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                      >
                        ✖ Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addPackage}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            ➕ Add Row
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 w-full">
          {packages.map((pkg, index) => (
            <div key={index} className="border rounded p-4 shadow-lg bg-white">
              <h3 className="text-lg font-semibold">{pkg.name || "Package Name"}</h3>
              <p><strong>Range:</strong> {pkg.range || "--"}</p>
              <p><strong>Fees:</strong> ${pkg.fees || "0.00"}</p>
              <p><strong>You Save:</strong> ${pkg.save || "0.00"}</p>
              <p><strong>Remark:</strong> {pkg.remarks || "0.00"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AharPackage;
