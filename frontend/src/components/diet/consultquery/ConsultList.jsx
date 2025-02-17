import React from 'react';

const ConsultList = () => {
  // Sample data for the consultations
  const consultData = [
    { srNo: 1, organization: 'HealthCare Inc.', doctor: 'Dr. John Doe', location: 'New York', contactNumber: '123-456-7890', website: 'www.healthcare.com' },
    { srNo: 2, organization: 'MedPlus Clinic', doctor: 'Dr. Jane Smith', location: 'Los Angeles', contactNumber: '098-765-4321', website: 'www.medplus.com' },
    { srNo: 3, organization: 'Wellness Center', doctor: 'Dr. Mark Johnson', location: 'Chicago', contactNumber: '555-123-4567', website: 'www.wellnesscenter.com' },
    { srNo: 4, organization: 'LifeCare', doctor: 'Dr. Emily Davis', location: 'San Francisco', contactNumber: '222-333-4444', website: 'www.lifecare.com' },
  ];

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-md">
     
      
      {/* Table displaying the consultation data */}
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Sr.No</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Organization</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Doctor</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Location</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Contact Number</th>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Website</th>
          </tr>
        </thead>
        <tbody>
          {consultData.map((item) => (
            <tr key={item.srNo} className="border-b">
              <td className="px-4 py-2">{item.srNo}</td>
              <td className="px-4 py-2">{item.organization}</td>
              <td className="px-4 py-2">{item.doctor}</td>
              <td className="px-4 py-2">{item.location}</td>
              <td className="px-4 py-2">{item.contactNumber}</td>
              <td className="px-4 py-2">
                <a href={`http://${item.website}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  {item.website}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultList;
