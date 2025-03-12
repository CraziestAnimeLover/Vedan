import React, { useState } from 'react';

const Own = () => {
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }));
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (type) => {
    setDropdown(dropdown === type ? null : type);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Year and Month Selection */}
      <div className="w-full flex justify-end text-lg font-semibold mb-6 space-x-4">
        <div className="relative">
          <button onClick={() => toggleDropdown('year')} className="border px-4 py-2 bg-white shadow-md rounded-lg hover:bg-gray-200">{selectedYear}</button>
          {dropdown === 'year' && (
            <ul className="absolute right-0 bg-white border mt-1 max-h-40 overflow-auto shadow-lg rounded-lg">
              {years.map(year => (
                <li key={year} onClick={() => { setSelectedYear(year); setDropdown(null); }} className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer">
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="relative">
          <button onClick={() => toggleDropdown('month')} className="border px-4 py-2 bg-white shadow-md rounded-lg hover:bg-gray-200">{selectedMonth}</button>
          {dropdown === 'month' && (
            <ul className="absolute right-0 bg-white border mt-1 max-h-40 overflow-auto shadow-lg rounded-lg">
              {months.map(month => (
                <li key={month} onClick={() => { setSelectedMonth(month); setDropdown(null); }} className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer">
                  {month}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Table */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* Example rows */}
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">1</td>
              <td className="border border-gray-300 px-4 py-2">Electronics</td>
              <td className="border border-gray-300 px-4 py-2 text-center">15</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">2</td>
              <td className="border border-gray-300 px-4 py-2">Furniture</td>
              <td className="border border-gray-300 px-4 py-2 text-center">8</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1 className='self-start p-4 mt-4'><span>*</span> Past Sales Review</h1>
    </div>
  );
};

export default Own;
