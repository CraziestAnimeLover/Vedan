import React, { useState } from 'react';

const Reminder = () => {
  // Sample data for the table (you can modify this or fetch it from an API later)
  const initialData = [
    { serialNo: 1, ringTime: '9:00 AM', remark: 'First Reminder' },
    { serialNo: 2, ringTime: '11:00 AM', remark: 'Second Reminder' },
    { serialNo: 3, ringTime: '2:00 PM', remark: 'Third Reminder' },
  ];

  const [reminders, setReminders] = useState(initialData);

  return (
    <div className="w-full p-4 bg-white shadow-lg rounded-md">
   

      {/* Table with Box Layout */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-center font-semibold">Serial No</th>
              <th className="px-4 py-2 border border-gray-300 text-center font-semibold">Ring Time</th>
              <th className="px-4 py-2 border border-gray-300 text-center font-semibold">Remark</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((reminder) => (
              <tr key={reminder.serialNo} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300 text-center">{reminder.serialNo}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{reminder.ringTime}</td>
                <td className="px-4 py-2 border border-gray-300 text-center">{reminder.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reminder;
