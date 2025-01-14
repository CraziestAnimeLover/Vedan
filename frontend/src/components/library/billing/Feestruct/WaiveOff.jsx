import React from "react";

const WaiveOff = () => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Waive Off</h2>
  
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Task Name</th>
            <th className="border border-gray-300 px-4 py-2">10 Days</th>
            <th className="border border-gray-300 px-4 py-2">15 Days</th>
            <th className="border border-gray-300 px-4 py-2">20 Days</th>
            <th className="border border-gray-300 px-4 py-2">30 Days</th>
          </tr>
        </thead>
        <tbody>
          {/* Row for Water Bottle */}
          <tr>
            <td className="border border-gray-300 px-4 py-2">Water Bottle</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
          </tr>

          {/* Row for Floor Clean */}
          <tr>
            <td className="border border-gray-300 px-4 py-2">Floor Clean</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
          </tr>

          {/* Row for Attendance Maintain */}
          <tr>
            <td className="border border-gray-300 px-4 py-2">Attendance Maintain</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
            <td className="border border-gray-300 px-4 py-2">✔️</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
);

export default WaiveOff;
