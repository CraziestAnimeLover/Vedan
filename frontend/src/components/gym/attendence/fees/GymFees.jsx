import React, { useState } from 'react';

const GymFees = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = [2022, 2023, 2024, 2025];

  const [selectedMonth, setSelectedMonth] = useState(months[0]);
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);
  const [data, setData] = useState([
 
    { srno: 2, name: 'Jane Doe', fees: 600, status: 'Unpaid', penalty: 'Late fee', remark: 'Pending approval' },
  ]);

  const handleEdit = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const handleDelete = (index) => {
    setData((prevData) => {
      const updatedData = prevData.filter((_, i) => i !== index);
      return updatedData.map((item, i) => ({ ...item, srno: i + 1 }));
    });
  };
  

  const handleAddRow = () => {
    const newRow = {
      srno: data.length + 1,
      name: '',
      fees: 0,
      status: 'Unpaid',
      penalty: '',
      remark: ''
    };
    setData([...data, newRow]);
  };

  const handleUpdate = () => {
    console.log('Updated data:', data);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-3 py-1 m-1 border rounded ${selectedMonth === month ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {month}
            </button>
          ))}
        </div>
        <select
          className="border p-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sr No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Fees</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Penalty</th>
            <th className="border p-2">Remark</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.srno} className="text-center">
              <td className="border p-2">{item.srno}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleEdit(index, 'name', e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={item.fees}
                  onChange={(e) => handleEdit(index, 'fees', e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border p-2">
                <select
                  value={item.status}
                  onChange={(e) => handleEdit(index, 'status', e.target.value)}
                  className="border p-1 w-full"
                >
                  <option value="Paid">Paid</option>
                  <option value="Notpaid">Notpaid</option>
                  <option value="hlafpaid">Halfpaid</option>
                </select>
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={item.penalty}
                  onChange={(e) => handleEdit(index, 'penalty', e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={item.remark}
                  onChange={(e) => handleEdit(index, 'remark', e.target.value)}
                  className="border p-1 w-full"
                />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleAddRow}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Row
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Update Data
        </button>
      </div>
    </div>
  );
};

export default GymFees;
