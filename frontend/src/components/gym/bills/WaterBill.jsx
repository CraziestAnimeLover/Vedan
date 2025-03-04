import React, { useState } from "react";
import { LucideCoins } from "lucide-react";
import { DollarSign, Euro, PoundSterling, IndianRupee, JapaneseYen } from "lucide-react";

const currencies = {
  USD: { rate: 1, icon: <DollarSign size={16} /> },
  EUR: { rate: 0.92, icon: <Euro size={16} /> },
  GBP: { rate: 0.79, icon: <PoundSterling size={16} /> },
  INR: { rate: 82, icon: <IndianRupee size={16} /> },
  JPY: { rate: 150, icon: <JapaneseYen size={16} /> },
};




const WaterBill = () => {
  const [waterBottles, setWaterBottles] = useState([
    { id: 1, date: "", quantity: "" },
  ]);
  const [waterBills, setWaterBills] = useState([
    { id: 1, billingDate: "", amount: "", fromTime: "", toTime: "", remarks: "", currency: "USD" },
  ]);
  
  
  const [showCurrencyList, setShowCurrencyList] = useState(null);
  const handleCurrencyChange = (index, newCurrency) => {
    setWaterBills((prev) =>
      prev.map((row, i) => {
        if (i === index) {
          const currentCurrency = row.currency || "USD"; // Fallback if undefined
          const newAmount = (row.amount / currencies[currentCurrency].rate) * currencies[newCurrency].rate;
          return { ...row, currency: newCurrency, amount: newAmount.toFixed(2) };
        }
        return row;
      })
    );
    setShowCurrencyList(null);
  };
  
  


  const handleBottleChange = (index, field, value) => {
    setWaterBottles((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const handleBillChange = (index, field, value) => {
    setWaterBills((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addWaterBottle = () => {
    setWaterBottles([...waterBottles, { id: waterBottles.length + 1, date: "", quantity: "" }]);
  };

  const removeWaterBottle = (index) => {
    setWaterBottles(waterBottles.filter((_, i) => i !== index));
  };

  const addWaterBill = () => {
    setWaterBills([
      ...waterBills,
      { id: waterBills.length + 1, billingDate: "", amount: "", fromTime: "", toTime: "", remarks: "", currency: "USD" },
    ]);
  };
  

  const removeWaterBill = (index) => {
    setWaterBills(waterBills.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <div className="w-full max-w-4xl">
        {/* Water Bottles Table */}
        <h2 className="text-lg font-semibold mb-2 text-center">Water Bottles</h2>
        <div className="overflow-x-auto overflow-y-auto max-h-96 border border-gray-300">

          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/6">Sr. No</th>
                <th className="border p-2 w-1/3">Date</th>
                <th className="border p-2 w-1/3">No. of Water Bottles</th>
                <th className="border p-2 w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {waterBottles.map((row, index) => (
                <tr key={row.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) => handleBottleChange(index, "date", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => handleBottleChange(index, "quantity", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button onClick={() => removeWaterBottle(index)} className="text-red-600 font-bold">✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addWaterBottle} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
          ➕ Add Row
        </button>

        {/* Water Bill Table */}
        <h2 className="text-lg font-semibold mt-6 mb-2 text-center">Water Bills</h2>
        <div className="overflow-x-auto overflow-y-auto max-h-96 border border-gray-300">
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/12" rowSpan={2}>Sr. No</th>
                <th className="border p-2 w-1/6" rowSpan={2}>Billing Date</th>
                <th className="border p-2 w-1/6" rowSpan={2}>Bill Amount</th>
                <th className="border p-2 w-1/4" colSpan={2}>Bill Time</th>
                <th className="border p-2 w-1/6" rowSpan={2}>Remarks</th>
                <th className="border p-2 w-1/12" rowSpan={2}>Actions</th>
              </tr>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/8">From</th>
                <th className="border p-2 w-1/8">To</th>
              </tr>
            </thead>
            <tbody>
              {waterBills.map((row, index) => (
                <tr key={row.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billingDate}
                      onChange={(e) => handleBillChange(index, "billingDate", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2 flex items-center space-x-2">
  <input
    type="number"
    value={row.amount}
    onChange={(e) => handleBillChange(index, "amount", e.target.value)}
    className="border p-1 w-full"
  />
  
  <div className="relative flex items-center space-x-1">
    <span className="text-gray-700">{currencies[row.currency]?.icon} </span>
    
    <button 
      onClick={() => setShowCurrencyList(index)} 
      className="p-1 border rounded"
    >
      <LucideCoins size={16} />
    </button>

    {showCurrencyList === index && (
      <div className="absolute bg-white border rounded shadow-lg p-1 mt-1 right-0 z-10">
        {Object.keys(currencies).map((currency) => (
          <button
            key={currency}
            onClick={() => handleCurrencyChange(index, currency)}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          >
            {currencies[currency].icon} {currency}
          </button>
        ))}
      </div>
    )}
  </div>
</td>

                  <td className="border p-2">
                    <input
                      type="time"
                      value={row.fromTime}
                      onChange={(e) => handleBillChange(index, "fromTime", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="time"
                      value={row.toTime}
                      onChange={(e) => handleBillChange(index, "toTime", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.remarks}
                      onChange={(e) => handleBillChange(index, "remarks", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button onClick={() => removeWaterBill(index)} className="text-red-600 font-bold">✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addWaterBill} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
          ➕ Add Row
        </button>
      </div>
    </div>
  );
};

export default WaterBill;
