import React, { useState } from 'react';
import axios from 'axios';

const Consultquery = () => {
  const [area, setArea] = useState('');
  const [fees, setFees] = useState(0);
  const [type, setType] = useState('allopathic');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/consultations', { area, fees, type });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl text-center font-semibold mb-4">Query</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-700">
            Area (Pincode or Pan India)
          </label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter Pincode or 'Pan India'"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="fees" className="block text-sm font-medium text-gray-700">
            Fees (Scale: 0 to Infinity)
          </label>
          <input
            type="range"
            id="fees"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            min="0"
            max="10000"
            step="1"
            className="mt-1 w-full"
          />
          <div className="mt-2 flex justify-between text-sm text-gray-700">
            <span>0</span>
            <span>{fees}</span>
            <span>∞</span>
          </div>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Types of Consultation
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="allopathic">Allopathic</option>
            <option value="homeopathic">Homeopathic</option>
            <option value="ayurvedic">Ayurvedic</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit Query
          </button>
        </div>
      </form>
    </div>
  );
};

export default Consultquery;
