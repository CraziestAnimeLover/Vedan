import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/live';

const Live = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleAddRow = () => {
    const newRow = {
      _id: null, // Placeholder, backend should assign an ID
      srNo: rows.length + 1,
      concept: '',
      date: '',
      time: '',
      image: null,
      file: null,
      isEditing: true,
    };
    setRows([...rows, newRow]);
  };
  
  
  

  const handleDeleteRow = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setRows(rows.filter(row => row._id !== id));
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const handleUpdateRow = async (id, updatedData) => {
    if (!id) {
      console.error("Cannot update row: ID is undefined.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("srNo", updatedData.srNo);
      formData.append("concept", updatedData.concept);
      formData.append("date", updatedData.date);
      formData.append("time", updatedData.time);
  
      if (updatedData.image) formData.append("image", updatedData.image);
      if (updatedData.file) formData.append("file", updatedData.file);
  
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };
  

  const handleFileUpload = async (e, index, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const newRows = [...rows];
      newRows[index][type] = response.data.fileUrl;
      setRows(newRows);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Live Data</h2>
      <button onClick={handleAddRow} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        Add Row
      </button>
      <table className="border-separate border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Concept</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Time</th>
            <th className="px-4 py-2 border">Pic</th>
            <th className="px-4 py-2 border">Document</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row._id} className="bg-white hover:bg-gray-50">
              <td className="px-4 py-2 border">
                <input
                  type="text"
                  value={row.concept}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].concept = e.target.value;
                    setRows(newRows);
                  }}
                  className="border px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].date = e.target.value;
                    setRows(newRows);
                  }}
                  className="border px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2 border">
                <input
                  type="time"
                  value={row.time}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].time = e.target.value;
                    setRows(newRows);
                  }}
                  className="border px-2 py-1 rounded"
                />
              </td>
              <td className="px-4 py-2 border">
                <input type="file" onChange={(e) => handleFileUpload(e, index, 'image')} />
                {row.image && <img src={row.image} alt="Uploaded" width="100" className="mt-2" />}
              </td>
              <td className="px-4 py-2 border">
                <input type="file" onChange={(e) => handleFileUpload(e, index, 'file')} />
                {row.file && <a href={row.file} download className="text-blue-600 hover:underline">Download</a>}
              </td>
              <td className="px-4 py-2 border">
              <button 
  onClick={() => {
    console.log("Updating row with ID:", row._id, row);
    handleUpdateRow(row._id, row);
  }} 
  className="bg-green-500 text-white py-1 px-3 rounded"
>
  Save
</button>


                <button onClick={() => handleDeleteRow(row._id)} className="bg-red-500 text-white py-1 px-3 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Live;
