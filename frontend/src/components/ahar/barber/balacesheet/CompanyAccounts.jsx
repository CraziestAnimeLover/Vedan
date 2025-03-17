import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Table = ({ title, data, setData }) => {
  const addRow = () => {
    setData([...data, { time: "January", value: 0 }]);
  };

  const deleteRow = (index) => {
    if (data.length > 1) {
      setData(data.filter((_, i) => i !== index));
    }
  };

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
                  onChange={(e) => updateValue(index, parseFloat(e.target.value) || 0)}
                /> Cr
              </td>
              <td className="border border-gray-800 p-2 text-center">
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

const CompanyAccounts = () => {
  const [revenueData, setRevenueData] = useState([
    { time: "January", value: 5 },
    { time: "February", value: 7 },
    { time: "March", value: 6.5 },
    { time: "April", value: 8 },
  ]);

  const [profitData, setProfitData] = useState([
    { time: "January", value: 1.2 },
    { time: "February", value: 1.5 },
    { time: "March", value: 1.4 },
    { time: "April", value: 1.8 },
  ]);

  const [networthData, setNetworthData] = useState([
    { time: "January", value: 20 },
    { time: "February", value: 23 },
    { time: "March", value: 22 },
    { time: "April", value: 25 },
  ]);

  return (
    <div className="flex flex-wrap">
      {/* Revenue Section */}
      <Table title="(1) Revenue " data={revenueData} setData={setRevenueData} />
      <Chart title="Revenue " data={revenueData} color="#4A90E2" />

      {/* Profit Section */}
      <Table title="(2) Profit " data={profitData} setData={setProfitData} />
      <Chart title="Profit " data={profitData} color="#50C878" />

      {/* Net Worth Section */}
      <Table title="(3) Net Worth " data={networthData} setData={setNetworthData} />
      <Chart title="Net Worth " data={networthData} color="#E94E77" />
    </div>
  );
};

export default CompanyAccounts;
