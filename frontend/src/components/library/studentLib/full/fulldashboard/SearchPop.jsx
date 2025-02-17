// React component - SearchPop.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchPop = () => {
  const [formData, setFormData] = useState({
    libraryZone: '',
    pincode: '',
    timeSlot: '',
    tentativeDate: '',
    fees: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/search', formData);
      console.log('Form Data Submitted:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Scroll to the form when button is clicked
  const scrollToForm = () => {
    const formElement = document.getElementById('searchForm');
    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="p-4 mt-8 bg-white shadow-lg rounded-lg w-96">
      <h2 className="text-lg font-semibold mb-4">(1) Library Zone</h2>
      <form id="searchForm" onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-sm font-medium">Library Zone</label>
          <input 
            type="text" 
            name="libraryZone" 
            value={formData.libraryZone} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Pincode</label>
          <input 
            type="text" 
            name="pincode" 
            value={formData.pincode} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Time Slot</label>
          <input 
            type="time" 
            name="timeSlot" 
            value={formData.timeSlot} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Tentative Date</label>
          <input 
            type="date" 
            name="tentativeDate" 
            value={formData.tentativeDate} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">(2) Fees</label>
          <input 
            type="range" 
            name="fees" 
            min="0" 
            max="1000" 
            value={formData.fees} 
            onChange={handleChange} 
            className="w-full"
          />
          <span className="block text-right text-sm">{formData.fees}</span>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Search
        </button>
      </form>

      {/* Scroll to the form button */}
      <button 
        onClick={scrollToForm} 
        className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Scroll to Form
      </button>
    </div>
  );
};

export default SearchPop;
