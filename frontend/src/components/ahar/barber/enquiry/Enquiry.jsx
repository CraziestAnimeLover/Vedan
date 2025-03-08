import React, { useState } from 'react';

const Enquiry = () => {
  // Sample data with PDF links
  const [data, setData] = useState([
    { id: 1, name: "John Doe", workout: "Cardio", contactName: "Mike Smith", address: "123 Street, NY", pdfLink: "https://example.com/john.pdf", remark: "fgfdg" },
    { id: 2, name: "Jane Doe", workout: "Strength Training", contactName: "Lisa Johnson", address: "456 Avenue, LA", pdfLink: "https://example.com/jane.pdf", remark: "gfdgd" },
    { id: 3, name: "Alice Brown", workout: "Yoga", contactName: "Robert Lee", address: "789 Road, TX", pdfLink: "https://example.com/alice.pdf", remark: "fdgdf" },
  ]);

  const handleRemarkChange = (index, value) => {
    const updatedData = [...data];
    updatedData[index].remark = value;
    setData(updatedData);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Sno</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Workout</th>
              <th className="border border-gray-300 px-4 py-2">Contact Name</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">PDF</th>
              <th className="border border-gray-300 px-4 py-2">Remark</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.workout}</td>
                <td className="border border-gray-300 px-4 py-2">{item.contactName}</td>
                <td className="border border-gray-300 px-4 py-2">{item.address}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <a 
                    href={item.pdfLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    View PDF
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enquiry;
