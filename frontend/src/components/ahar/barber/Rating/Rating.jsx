import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Rating = () => {
  const [data, setData] = useState([]);
  const [keyPoint, setKeyPoint] = useState("");
  const [number, setNumber] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const handleAddOrUpdate = () => {
    if (!keyPoint || !number) {
      alert("Please enter Key Point and Number!");
      return;
    }

    const newData = [...data];

    if (editIndex !== null) {
      newData[editIndex] = { keyPoint, number: parseInt(number, 10) };
      setEditIndex(null);
    } else {
      // Add new entry to the TOP of the table
      newData.unshift({ keyPoint, number: parseInt(number, 10) });
    }

    setData(newData);
    setKeyPoint("");
    setNumber("");
  };

  const handleEdit = (index) => {
    setKeyPoint(data[index].keyPoint);
    setNumber(data[index].number);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  const handleSort = (key) => {
    setSortBy(key);
    setData([...data].sort((a, b) => (a[key] > b[key] ? 1 : -1)));
  };

  const maxNumber = Math.max(...data.map((item) => item.number), 0);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      

      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sr. No</th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("keyPoint")}>
              Key Point 🔼
            </th>
            <th className="border p-2 cursor-pointer" onClick={() => handleSort("number")}>
              Number 🔼
            </th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="border p-2 text-center">-</td>
            <td className="border p-2">
              <input
                type="text"
                placeholder="Key Point"
                value={keyPoint}
                onChange={(e) => setKeyPoint(e.target.value)}
                className="p-2 border rounded w-full"
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                placeholder="Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="p-2 border rounded w-full"
                min="1"
              />
            </td>
            <td className="border p-2 text-center">
              <button onClick={handleAddOrUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </td>
          </tr>

          {data.map((item, index) => (
            <tr key={index} className={`border-b ${item.number === maxNumber ? "bg-green-100" : ""}`}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{item.keyPoint}</td>
              <td className="border p-2 text-center">{item.number}</td>
              <td className="border p-2 text-center space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full h-64 mt-4">
        <ResponsiveContainer width="50%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="keyPoint" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="number" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Rating;
