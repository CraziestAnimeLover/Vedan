import React, { useState } from 'react';
import axios from 'axios';

const Reminder = () => {
  // Sample data for the table (you can modify this or fetch it from an API later)
  const initialData = [
    { serialNo: 1, ringTime: '9:00 AM', remark: 'First Reminder' },
    { serialNo: 2, ringTime: '11:00 AM', remark: 'Second Reminder' },
    { serialNo: 3, ringTime: '2:00 PM', remark: 'Third Reminder' },
  ];

  const [reminders, setReminders] = useState(initialData);

  const handleChange = (e, index, field) => {
    const updatedReminders = [...reminders];
    updatedReminders[index][field] = e.target.value;
    setReminders(updatedReminders);
  };

  const handleAddReminder = () => {
    const newReminder = {
      serialNo: reminders.length + 1, // Increment the serial number
      ringTime: '',
      remark: '',
    };
    setReminders([...reminders, newReminder]);
  };

  const handleRemoveReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  const handleSubmit = async () => {
    try {
      for (const reminder of reminders) {
        // Send the reminder data to the backend using POST request
        const response = await axios.post('http://localhost:8000/api/reminders', reminder);
        console.log('Reminder submitted successfully:', response.data);
      }
      alert('Form Submitted');
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Error submitting form');
    }
  };
  
  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-md">
      {/* Add Button */}
      <div className="mb-4">
        <button
          onClick={handleAddReminder}
          className="py-2 px-4 bg-green-500 text-white rounded-md"
        >
          Add Reminder
        </button>
      </div>

      {/* Table with Box Layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-center font-semibold">Serial No</th>
              <th className="px-4 py-2 border border-gray-300 text-center font-semibold">Ring Time</th>
              <th className="px-4 py-2 border border-gray-300 text-center font-semibold">Remark</th>
              <th className="px-4 py-2 border border-gray-300 text-center font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder, index) => (
              <tr key={reminder.serialNo} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-center">{reminder.serialNo}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="text"
                    value={reminder.ringTime}
                    onChange={(e) => handleChange(e, index, 'ringTime')}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <input
                    type="text"
                    value={reminder.remark}
                    onChange={(e) => handleChange(e, index, 'remark')}
                    className="w-full p-1 border border-gray-300 rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300 text-center">
                  <button
                    onClick={() => handleRemoveReminder(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit Button */}
      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="py-2 px-4 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Reminder;
