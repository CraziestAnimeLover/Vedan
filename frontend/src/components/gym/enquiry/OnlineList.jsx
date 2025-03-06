import React from 'react';

const OnlineList = () => {
  // Sample data (You can replace this with actual data from props or API)
  const data = [
    { id: 1, name: "John Doe", workout: "Cardio", contactName: "Mike Smith", address: "123 Street, NY" },
    { id: 2, name: "Jane Doe", workout: "Strength Training", contactName: "Lisa Johnson", address: "456 Avenue, LA" },
    { id: 3, name: "Alice Brown", workout: "Yoga", contactName: "Robert Lee", address: "789 Road, TX" },
  ];

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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnlineList;
