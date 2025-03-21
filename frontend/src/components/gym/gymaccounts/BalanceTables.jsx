import React from "react";

const BalanceTables = ({ assets, liabilities, updateValue, calculateTotal, handleSubmit, equity, handleEquityChange }) => {
  return (
    <div className="w-full md:w-3/4 p-4 mx-auto">
      <form onSubmit={handleSubmit}>
        {/* ✅ Assets Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Assets</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-800">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border border-gray-800 p-2">Sr. No.</th>
                  <th className="border border-gray-800 p-2">Assets</th>
                  <th className="border border-gray-800 p-2">Rupees</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((item, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100 transition">
                    <td className="border border-gray-800 p-2">{index + 1}</td>
                    <td className="border border-gray-800 p-2">{item.type}</td>
                    <td className="border border-gray-800 p-2">
                    <input
  type="number"
  className="w-full p-1 border border-gray-400 rounded"
  value={item.rupees}
  onChange={(e) => updateValue("assets", index, parseFloat(e.target.value) || 0)}
/>
 ₹
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-200 font-bold">
                  <td className="border border-gray-800 p-2" colSpan="2">Total</td>
                  <td className="border border-gray-800 p-2">{calculateTotal(assets)} ₹</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ Liabilities Table */}
        <div>
          <h2 className="text-xl font-bold text-gray-700 mb-2">Liabilities</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-800">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border border-gray-800 p-2">Sr. No.</th>
                  <th className="border border-gray-800 p-2">Liability</th>
                  <th className="border border-gray-800 p-2">Rupees</th>
                </tr>
              </thead>
              <tbody>
                {liabilities.map((item, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100 transition">
                    <td className="border border-gray-800 p-2">{index + 1}</td>
                    <td className="border border-gray-800 p-2">{item.type}</td>
                    <td className="border border-gray-800 p-2">
                    <input
  type="number"
  className="w-full p-1 border border-gray-400 rounded"
  value={item.rupees}
  onChange={(e) => updateValue("liabilities", index, parseFloat(e.target.value) || 0)}
/>
 ₹
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-200 font-bold">
                  <td className="border border-gray-800 p-2" colSpan="2">Total</td>
                  <td className="border border-gray-800 p-2">{calculateTotal(liabilities)} ₹</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ Equity Input */}
        <div className="text-xl font-bold text-gray-700 mt-6 mb-2">
          <h1>Equity</h1>
          <input
            type="number"
            className="w-full p-1 border border-gray-400 rounded"
            value={equity}
            onChange={handleEquityChange}
          /> ₹
        </div>

        {/* ✅ Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BalanceTables;
