import React, { useState, useEffect } from "react";
import axios from "axios";

const Corrective = () => {
  const [rows, setRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const [newRow, setNewRow] = useState({
    reportDate: "",
    instrumentName: "",
    instrumentId: "",
    contactPerson: "",
    file: null,
    fileName: "",
    correctiveAction: "",
    status: "Pending", // Default value
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/correctives");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e, field) => {
    setNewRow((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleEditChange = (e, field) => {
    setEditedRow((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setNewRow({ ...newRow, file, fileName: file.name });
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleAddRow = async () => {
    console.log("📊 Form Data Before Submission:", newRow);

    if (!newRow.status || newRow.status.trim() === "") {
      alert("⚠️ Status is required!");
      return;
    }

    try {
      const data = new FormData();
      data.append("reportDate", newRow.reportDate);
      data.append("instrumentName", newRow.instrumentName);
      data.append("instrumentId", newRow.instrumentId);
      data.append("contactPerson", newRow.contactPerson);
      data.append("correctiveAction", newRow.correctiveAction);
      data.append("status", newRow.status); // Ensure status is always set
      if (newRow.file) {
        data.append("file", newRow.file);
      }

      console.log("📤 Sending Data:", Object.fromEntries(data.entries()));

      const response = await axios.post("http://localhost:8000/api/correctives", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Response:", response.data);

      // Add new row to the table
      setRows([...rows, response.data]);

      // Reset form
      setNewRow({
        reportDate: "",
        instrumentName: "",
        instrumentId: "",
        contactPerson: "",
        file: null,
        fileName: "",
        correctiveAction: "",
        status: "Pending",
      });
    } catch (error) {
      console.error("❌ Error adding data:", error.response?.data || error.message);
    }
  };

  const handleEditRow = (row) => {
    setEditRowId(row._id);
    setEditedRow({ ...row });
  };
  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedRow(null);
  };

  const handleUpdateRow = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/correctives/${id}`, editedRow);
      setRows(rows.map((row) => (row._id === id ? editedRow : row)));
      setEditRowId(null);
      setEditedRow(null);
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/correctives/${id}`);
      setRows(rows.filter((row) => row._id !== id));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  return (
    <div className="w-4/5 p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Corrective Actions</h2>
      <table className="w-4/5 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-1">S.No</th>
            <th className="border p-1">Report Date</th>
            <th className="border p-1">Instrument Name</th>
            <th className="border p-1">Instrument ID</th>
            <th className="border p-1">Contact Person</th>
            <th className="border p-1">File</th>
            <th className="border p-1">Corrective Action</th>
            <th className="border p-1">Status</th>
            <th className="border p-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row._id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{row.reportDate}</td>
              <td className="border p-2">{row.instrumentName}</td>
              <td className="border p-2">{row.instrumentId}</td>
              <td className="border p-2">{row.contactPerson}</td>
              <td className="border p-2">
                {row.file ? (
                  <a href={`http://localhost:8000/${row.file}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    {row.file}
                  </a>
                ) : (
                  "No File"
                )}
              </td>
              <td className="border p-2">{row.correctiveAction}</td>
              <td className="border p-2">{row.status}</td>
              <td className="border p-2">
  {editRowId === row._id ? (
    <>
      <button
        onClick={() => handleUpdateRow(row._id)}
        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
      >
        Update
      </button>
      <button
        onClick={handleCancelEdit}
        className="bg-gray-500 text-white px-2 py-1 rounded"
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleEditRow(row)}
        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
      >
        Edit
      </button>
      <button
        onClick={() => handleDeleteRow(row._id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </>
  )}
</td>

            </tr>
          ))}
          <tr>
            <td className="border p-2 text-center">{rows.length + 1}</td>
            <td className="border p-2">
              <input type="date" value={newRow.reportDate} onChange={(e) => handleInputChange(e, "reportDate")} className="border p-1 rounded" />
            </td>
            <td className="border p-2">
              <input type="text" value={newRow.instrumentName} onChange={(e) => handleInputChange(e, "instrumentName")} className="border p-1 rounded" />
            </td>
            <td className="border p-2">
              <input type="text" value={newRow.instrumentId} onChange={(e) => handleInputChange(e, "instrumentId")} className="border p-1 rounded" />
            </td>
            <td className="border p-2">
              <input type="text" value={newRow.contactPerson} onChange={(e) => handleInputChange(e, "contactPerson")} className="border p-1 rounded" />
            </td>
            <td className="border p-2">
              <input type="file" accept="application/pdf" onChange={handleFileUpload} className="border p-1 rounded" />
            </td>
            <td className="border p-2">
              <input type="text" value={newRow.correctiveAction} onChange={(e) => handleInputChange(e, "correctiveAction")} className="border p-1 rounded" />
            </td>
            <td className="border p-2">
              <select value={newRow.status} onChange={(e) => handleInputChange(e, "status")} className="border p-1 rounded">
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </td>
            <td className="border p-2">
              <button onClick={handleAddRow} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Corrective;
