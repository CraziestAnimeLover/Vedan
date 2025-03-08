import React, { useState } from "react";

const BarberCorrective = () => {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({
    reportDate: "",
    instrumentName: "",
    instrumentId: "",
    contactPerson: "",
    file: null,
    fileName: "",
    correctiveAction: "",
    status: ""
  });

  const handleInputChange = (e, field) => {
    setNewRow({ ...newRow, [field]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setNewRow({ ...newRow, file, fileName: file.name });
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  const handleAddRow = () => {
    setRows([...rows, { ...newRow, id: rows.length + 1 }]);
    setNewRow({
      reportDate: "",
      instrumentName: "",
      instrumentId: "",
      contactPerson: "",
      file: null,
      fileName: "",
      correctiveAction: "",
      status: ""
    });
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleEditRow = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div className="w-4/5 p-4 overflow-auto"> {/* Adjust width as per sidebar */}
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
            <tr key={row.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="date"
                  value={row.reportDate}
                  onChange={(e) => handleEditRow(row.id, "reportDate", e.target.value)}
                  className="border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.instrumentName}
                  onChange={(e) => handleEditRow(row.id, "instrumentName", e.target.value)}
                  className="border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.instrumentId}
                  onChange={(e) => handleEditRow(row.id, "instrumentId", e.target.value)}
                  className="border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.contactPerson}
                  onChange={(e) => handleEditRow(row.id, "contactPerson", e.target.value)}
                  className="border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                {row.fileName ? (
                  <a href={URL.createObjectURL(row.file)} target="_blank" rel="noopener noreferrer" className="text-blue-500">{row.fileName}</a>
                ) : (
                  "No File"
                )}
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={row.correctiveAction}
                  onChange={(e) => handleEditRow(row.id, "correctiveAction", e.target.value)}
                  className="border p-1 rounded"
                />
              </td>
              <td className="border p-2">
                <select
                  value={row.status}
                  onChange={(e) => handleEditRow(row.id, "status", e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td className="border p-2">
                <button onClick={() => handleDeleteRow(row.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
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
              <button onClick={handleAddRow} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BarberCorrective;