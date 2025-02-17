import React from 'react';

const SearchCard = () => {
  // Example data for cards and table rows
  const data = [
    { id: 1, name: 'John Doe', vedannId: 'V001', address: '123 Street', contact: '123-456-7890', imgSrc: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Doe', vedannId: 'V002', address: '456 Avenue', contact: '987-654-3210', imgSrc: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Alice Smith', vedannId: 'V003', address: '789 Road', contact: '555-123-4567', imgSrc: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Bob Johnson', vedannId: 'V004', address: '101 Parkway', contact: '555-987-6543', imgSrc: 'https://via.placeholder.com/150' },
    // Add more data objects as needed
  ];

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Upper Section with Scrollable Cards */}
      <div className="flex flex-wrap  gap-4 overflow-y-auto p-4 space-y-4 max-h-96">
        {data.map((item, index) => (
          <div key={index} className="w-78 bg-white shadow-lg rounded-lg p-4 flex items-center">
            {/* Left Side: Serial Number and Image in a Row */}
            <div className="flex items-center space-x-4">
              {/* Serial Number */}
              <div className="flex-none w-9 h-9 flex items-center justify-center mb-24 bg-gray-100 rounded-full">
                <span className="font-semibold">{item.id}</span>
              </div>

              {/* Image */}
              <div className="flex-none w-16 h-16">
                <img
                  src={item.imgSrc}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="ml-4 space-y-2">
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>VedannID:</strong> {item.vedannId}</p>
              <p><strong>Address:</strong> {item.address}</p>
              <p><strong>Contact:</strong> {item.contact}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lower Section with Table */}
      <div className="w-full overflow-x-auto mt-6">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">S.no</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">VedannID</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.vedannId}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchCard;
