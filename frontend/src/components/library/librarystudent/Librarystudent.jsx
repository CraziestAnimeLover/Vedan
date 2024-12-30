import React, { useState } from 'react';

const Librarystudent = ({ availability, onSubmit }) => {
  const [formData, setFormData] = useState({
    tableNumber: '',
    timingSlot: '',
    bookingName: '',
    tokenAmount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Booking Form</h2>

      <h3 className="text-lg font-medium text-gray-700 mb-2">Available Slots:</h3>
      <ul className="mb-4">
        {availability.map((slot, index) => (
          <li
            key={index}
            className={`py-2 px-4 rounded mb-2 ${
              slot.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {slot.time} - {slot.available ? 'Available' : 'Occupied'}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tableNumber" className="block text-gray-700 font-medium">
            Table Number
          </label>
          <input
            type="text"
            id="tableNumber"
            name="tableNumber"
            value={formData.tableNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter table number"
            required
          />
        </div>

        <div>
          <label htmlFor="timingSlot" className="block text-gray-700 font-medium">
            Timing Slot
          </label>
          <select
            id="timingSlot"
            name="timingSlot"
            value={formData.timingSlot}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select a timing slot</option>
            {availability.map(
              (slot, index) =>
                slot.available && (
                  <option key={index} value={slot.time}>
                    {slot.time}
                  </option>
                )
            )}
          </select>
        </div>

        <div>
          <label htmlFor="bookingName" className="block text-gray-700 font-medium">
            Booking Name
          </label>
          <input
            type="text"
            id="bookingName"
            name="bookingName"
            value={formData.bookingName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="tokenAmount" className="block text-gray-700 font-medium">
            Token Amount
          </label>
          <input
            type="number"
            id="tokenAmount"
            name="tokenAmount"
            value={formData.tokenAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter token amount"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default Librarystudent;
