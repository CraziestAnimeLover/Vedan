import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const API_URL = "http://localhost:8000/api/financial-data"; // Update with your backend URL

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Table = ({ title, keyName, data, setData, updateRow }) => {
  const addRow = () => setData([...data, { time: "January", value: 0 }]);
  const deleteRow = (index) => setData(data.filter((_, i) => i !== index));

  const updateTime = (index, newTime) => {
    const updatedData = [...data];
    updatedData[index].time = newTime;
    setData(updatedData);
  };

  const updateValue = (index, newValue) => {
    const updatedData = [...data];
    updatedData[index].value = newValue;
    setData(updatedData);
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
            <tr key={index} className="bg-white hover:bg-gray-100 transition">
              <td className="border border-gray-800 p-2">{index + 1}</td>
              <td className="border border-gray-800 p-2">
                <select
                  className="w-full p-1 border border-gray-400 rounded"
                  value={item.time}
                  onChange={(e) => updateTime(index, e.target.value)}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </td>
              <td className="border border-gray-800 p-2">
                <input
                  type="number"
                  className="w-full p-1 border border-gray-400 rounded"
                  value={item.value}
                  onChange={(e) => updateValue(index, parseFloat(e.target.value) || 0)}
                /> Cr
              </td>
              <td className="border border-gray-800 p-2 flex gap-2 justify-center">
                <button 
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  onClick={() => updateRow(keyName, index, item)}
                >
                  🔄 Update
                </button>
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteRow(index)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={addRow}>
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

const CompanyAccounts = () => {
  const [financialData, setFinancialData] = useState({
    revenue: [],
    profit: [],
    networth: [],
  });
  const [documentId, setDocumentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
        const data = await response.json();
        console.log("🔍 API Response:", data); // ✅ Debug log
  
        if (!data || !data._id) {
          console.error("⚠️ Document ID (_id) is missing in response:", data);
          return;
        }
  
        setFinancialData({
          revenue: data.revenue || [],
          profit: data.profit || [],
          networth: data.networth || [],
        });
  
        setDocumentId(data._id); // ✅ Ensure Document ID is saved
        console.log("✅ Document ID set:", data._id);
      } catch (error) {
        console.error("❌ Error fetching financial data:", error.message);
      }
    };
  
    fetchData();
  }, []);
  
  
  
  

  const updateRow = async (key, index, rowData) => {
    if (!documentId) {
      console.error("Document ID is missing! Cannot update data.");
      return;
    }
  
    try {
      const updatedData = [...financialData[key]];
      updatedData[index] = rowData;
  
      console.log("Sending update request with:", JSON.stringify({ [key]: updatedData }, null, 2));
  
      const response = await fetch(`${API_URL}/${documentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: updatedData }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Update success:", result);
  
      setMessage(`${key} row updated successfully!`);
      setFinancialData((prev) => ({ ...prev, [key]: updatedData }));
  
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(`Error updating ${key}:`, error.message);
      setMessage(`Error updating ${key}`);
    }
  };
  
  if (loading) return <p className="text-center text-lg font-bold">Loading financial data...</p>;

  return (
    <div className="flex flex-wrap">
      {message && <p className="w-full text-center text-green-600 font-bold">{message}</p>}

      <Table 
        title="(1) Revenue" 
        keyName="revenue"
        data={financialData.revenue} 
        setData={(data) => setFinancialData((prev) => ({ ...prev, revenue: data }))}
        updateRow={updateRow}
      />
      <Chart title="Revenue" data={financialData.revenue} color="#4A90E2" />

      <Table 
        title="(2) Profit" 
        keyName="profit"
        data={financialData.profit} 
        setData={(data) => setFinancialData((prev) => ({ ...prev, profit: data }))}
        updateRow={updateRow}
      />
      <Chart title="Profit" data={financialData.profit} color="#50C878" />

      <Table 
        title="(3) Net Worth" 
        keyName="networth"
        data={financialData.networth} 
        setData={(data) => setFinancialData((prev) => ({ ...prev, networth: data }))}
        updateRow={updateRow}
      />
      <Chart title="Net Worth" data={financialData.networth} color="#E94E77" />
    </div>
  );
};

export default CompanyAccounts;
