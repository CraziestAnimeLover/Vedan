import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const API_URL = "http://localhost:8000/api/gym-accounts";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Table = ({ title, type, data, setData, fetchData }) => {
  const addRow = async () => {
    try {
      const newRecord = { type, time: "January", value: 0 };
      const res = await axios.post(API_URL, newRecord);
      setData([...data, res.data]);
    } catch (error) {
      console.error("Error adding row:", error);
    }
  };

  const deleteRow = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const updateRow = async (id, updatedField) => {
    try {
      const updatedItem = { ...data.find((item) => item._id === id), ...updatedField };
      const res = await axios.put(`${API_URL}/${id}`, updatedItem);
      setData(data.map((item) => (item._id === id ? res.data : item)));
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-lg font-bold text-gray-700 mb-2">{title}</h2>
      <table className="w-full border-collapse border border-gray-800">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="border border-gray-800 p-2">Sr. No.</th>
            <th className="border border-gray-800 p-2">Time (Month)</th>
            <th className="border border-gray-800 p-2">Value (Cr)</th>
            <th className="border border-gray-800 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id} className="bg-white hover:bg-gray-100 transition">
              <td className="border border-gray-800 p-2">{index + 1}</td>
              <td className="border border-gray-800 p-2">
                <select
                  className="w-full p-1 border border-gray-400 rounded"
                  value={item.time}
                  onChange={(e) => updateRow(item._id, { time: e.target.value })}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-800 p-2">
                <input
                  type="number"
                  className="w-full p-1 border border-gray-400 rounded"
                  value={item.value}
                  onChange={(e) => updateRow(item._id, { value: parseFloat(e.target.value) || 0 })}
                /> Cr
              </td>
              <td className="border border-gray-800 p-2 text-center">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteRow(item._id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={addRow}
      >
        ➕ Add Row
      </button>
    </div>
  );
};

const Chart = ({ title, data, color }) => (
  <div className="w-full md:w-1/2 p-4">
    <h2 className="text-lg font-bold text-gray-700 mb-2">{title}</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const GymAccounts = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [networthData, setNetworthData] = useState([]);

  const fetchData = async (type, setData) => {
    try {
      const res = await axios.get(`${API_URL}/${type}`);
      setData(res.data);
    } catch (error) {
      console.error(`Error fetching ${type} data:`, error);
    }
  };

  useEffect(() => {
    fetchData("Revenue", setRevenueData);
    fetchData("Profit", setProfitData);
    fetchData("NetWorth", setNetworthData);
  }, []);

  return (
    <div className="flex flex-wrap">
      <Table title="(1) Revenue" type="Revenue" data={revenueData} setData={setRevenueData} fetchData={fetchData} />
      <Chart title="Revenue" data={revenueData} color="#4A90E2" />

      <Table title="(2) Profit" type="Profit" data={profitData} setData={setProfitData} fetchData={fetchData} />
      <Chart title="Profit" data={profitData} color="#50C878" />

      <Table title="(3) Net Worth" type="NetWorth" data={networthData} setData={setNetworthData} fetchData={fetchData} />
      <Chart title="Net Worth" data={networthData} color="#E94E77" />
    </div>
  );
};

export default GymAccounts;
