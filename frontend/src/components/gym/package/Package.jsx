import React, { useState, useEffect } from "react";
import axios from "axios";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPackages();
  }, []);
  const fetchPackages = async () => {
    const response = await axios.get("http://localhost:8000/api/gym/packages");
    console.log("Fetched Packages:", response.data); // Check if `_id` is correct
};


  const handleUpdate = async (id, data) => {
    console.log("Updating package with ID:", id);
    await axios.put(`http://localhost:8000/api/gym/packages/${id}`, data);
};

  const handleInputChange = (index, field, value) => {
    setPackages((prev) =>
      prev.map((pkg, i) => (i === index ? { ...pkg, [field]: value } : pkg))
    );
  };

  const addPackage = async () => {
    try {
      const newPackage = {
        name: "New Package",
        range: "1 Month",
        fees: 1000,
        save: 100,
        remarks: "New entry",
      };
  
      // Send the request WITHOUT an `_id`, MongoDB will generate it
      const response = await axios.post("http://localhost:8000/api/gym/packages", newPackage);
  
      if (response.data) {
        setPackages((prev) => [...prev, response.data]); // Use MongoDB's `_id`
      }
    } catch (error) {
      console.error("Error adding package:", error);
      setError("Failed to add package.");
    }
  };
  
  
  
  const removePackage = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/gym/packages/${id}`);
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
    } catch (error) {
      console.error("Error deleting package:", error);
      setError("Failed to delete package.");
    }
  };

  const updatePackage = async (index) => {
    try {
      const packageToUpdate = packages[index];
  
      if (!packageToUpdate._id || packageToUpdate._id.length !== 24) {
        console.error("Invalid ID format:", packageToUpdate._id);
        setError("Invalid package ID format.");
        return;
      }
  
      const { _id, ...updatedPackageData } = packageToUpdate;
  
      console.log("Sending update request with data:", updatedPackageData);
  
      const response = await axios.put(
        `http://localhost:8000/api/gym/packages/${_id}`,
        updatedPackageData
      );
  
      console.log("Package updated successfully:", response.data);
      fetchPackages();
    } catch (error) {
      console.error("Error updating package:", error.response?.data || error.message);
      setError("Failed to update package.");
    }
  };
  




  return (
    <div className="p-4 flex flex-col items-center w-full relative">
      {error && <p className="text-red-500">{error}</p>}

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
                <tr key={row._id} className="text-sm">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => handleInputChange(index, "name", e.target.value)}
                        className="border p-1 w-full text-sm"
                      />
                    ) : (
                      row.name
                    )}
                  </td>
                  <td className="border p-2">
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={row.range}
                        onChange={(e) => handleInputChange(index, "range", e.target.value)}
                        className="border p-1 w-full text-sm"
                      />
                    ) : (
                      row.range
                    )}
                  </td>
                  <td className="border p-2">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={row.fees}
                        onChange={(e) => handleInputChange(index, "fees", e.target.value)}
                        className="border p-1 w-full text-sm"
                      />
                    ) : (
                      `$${row.fees}`
                    )}
                  </td>
                  <td className="border p-2">
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={row.save}
                        onChange={(e) => handleInputChange(index, "save", e.target.value)}
                        className="border p-1 w-full text-sm"
                      />
                    ) : (
                      `$${row.save}`
                    )}
                  </td>
                  <td className="border p-2">
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={row.remarks}
                        onChange={(e) => handleInputChange(index, "remarks", e.target.value)}
                        className="border p-1 w-full text-sm"
                      />
                    ) : (
                      row.remarks
                    )}
                  </td>
                  <td className="border p-2 text-center">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      {editIndex === index ? (
                        <button
                          onClick={() => updatePackage(index)}
                          className="px-2 py-1 bg-green-500 text-white rounded text-xs"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditIndex(index)}
                          className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => removePackage(row._id)}
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
          {packages.map((pkg) => (
            <div key={pkg._id} className="border rounded p-4 shadow-lg bg-white">
              <h3 className="text-lg font-semibold">{pkg.name}</h3>
              <p><strong>Range:</strong> {pkg.range}</p>
              <p><strong>Fees:</strong> ${pkg.fees}</p>
              <p><strong>You Save:</strong> ${pkg.save}</p>
              <p><strong>Remark:</strong> {pkg.remarks}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Package;
