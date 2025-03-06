import React, { useState } from 'react';

const Live = () => {
  const [rows, setRows] = useState([
    { srNo: 1, concept: 'Concept 1', date: '2025-03-06', time: '10:00 AM', image: null, file: null, isEditing: false }
  ]);

  const handleImageClick = (e, index) => {
    const imageFile = e.target.files[0];
    if (imageFile && imageFile.type.startsWith('image')) {
      const newRows = [...rows];
      newRows[index].image = URL.createObjectURL(imageFile);
      setRows(newRows);
    } else {
      alert('Please select an image.');
    }
  };

  const handleDocumentChange = (e, index) => {
    const docFile = e.target.files[0];
    if (docFile && docFile.type === 'application/pdf') {
      const newRows = [...rows];
      newRows[index].file = docFile;
      setRows(newRows);
    } else {
      alert('Please select a PDF document.');
    }
  };

  const handleAddRow = () => {
    const newRow = {
      srNo: rows.length + 1,
      concept: '',
      date: '',
      time: '',
      image: null,
      file: null,
      isEditing: true,  // New row is in editing mode by default
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleToggleEdit = (index) => {
    const newRows = [...rows];
    newRows[index].isEditing = !newRows[index].isEditing; // Toggle editing mode
    setRows(newRows);
  };

  const handleUpdateRow = (index) => {
    const newRows = [...rows];
    newRows[index].isEditing = false; // Save the updated row and exit edit mode
    setRows(newRows);
  };

  return (
    <div className=" w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Live Data</h2>
      <button 
        onClick={handleAddRow}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Add Row
      </button>
      <div className=' bg-slate-750 w-2/3'>

      <table className=" border-separate border border-gray-300 w-2/3 ">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-1 py-2 text-left border">SrNo</th>
            <th className="px-4 py-2 text-left border">Concept</th>
            <th className="px-4 py-2 text-left border">Date</th>
            <th className="px-4 py-2 text-left border">Time</th>
            <th className="px-4 py-2 text-left border">Pic</th>
            <th className="px-4 py-2 text-left border">Document Link</th>
            <th className="px-4 py-2 text-left border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-2 border">{row.srNo}</td>
              <td className="px-4 py-2 border">
                {row.isEditing ? (
                  <input
                    type="text"
                    value={row.concept}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows[index].concept = e.target.value;
                      setRows(newRows);
                    }}
                    className="border border-gray-300 px-2 py-1 rounded"
                  />
                ) : (
                  row.concept
                )}
              </td>
              <td className="px-4 py-2 border">
                {row.isEditing ? (
                  <input
                    type="date"
                    value={row.date}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows[index].date = e.target.value;
                      setRows(newRows);
                    }}
                    className="border border-gray-300 px-2 py-1 rounded"
                  />
                ) : (
                  row.date
                )}
              </td>
              <td className="px-4 py-2 border">
                {row.isEditing ? (
                  <input
                    type="time"
                    value={row.time}
                    onChange={(e) => {
                      const newRows = [...rows];
                      newRows[index].time = e.target.value;
                      setRows(newRows);
                    }}
                    className="border border-gray-300 px-2 py-1 rounded"
                  />
                ) : (
                  row.time
                )}
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="file"
                  onChange={(e) => handleImageClick(e, index)}
                  className="border border-gray-300 px-2 py-1 rounded"
                />
                {row.image && <img src={row.image} alt="Uploaded" width="100" className="mt-2" />}
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="file"
                  onChange={(e) => handleDocumentChange(e, index)}
                  accept="application/pdf"
                  className="border border-gray-300 px-2 py-1 rounded"
                />
                {row.file && (
                  <a
                    href={URL.createObjectURL(row.file)}
                    download={row.file.name}
                    className="text-blue-600 hover:underline mt-2 block"
                  >
                    Download PDF
                  </a>
                )}
              </td>
              <td className="px-4 gap-2  py-2 border">
                {row.isEditing ? (
                  <button
                    onClick={() => handleUpdateRow(index)}
                    className="bg-green-500 text-white py-1 px-3 rounded"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleEdit(index)}
                    className="bg-yellow-500 text-white mb-2 py-1 px-4 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="bg-red-500 text-white mt-2 py-1 px-2 rounded "
                >
                 ×
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Live;
