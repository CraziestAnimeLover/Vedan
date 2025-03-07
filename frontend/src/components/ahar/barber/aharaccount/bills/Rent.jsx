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

const Rent = () => {
  const [rentBills, setRentBills] = useState([
    { id: 1, billFrom: "", billTo: "", rentAmount: "", billingDate: "", remark: "", currency: "USD" },
  ]);
  const [showCurrencyList, setShowCurrencyList] = useState(null);

  const handleRentChange = (index, field, value) => {
    setRentBills((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addRentBill = () => {
    setRentBills([
      ...rentBills,
      { id: rentBills.length + 1, billFrom: "", billTo: "", rentAmount: "", billingDate: "", remark: "", currency: "USD" },
    ]);
  };

  const removeRentBill = (index) => {
    setRentBills(rentBills.filter((_, i) => i !== index));
  };

  const handleCurrencyChange = (index, newCurrency) => {
    setRentBills((prev) =>
      prev.map((row, i) => {
        if (i === index) {
          const newAmount = (row.rentAmount / currencies[row.currency].rate) * currencies[newCurrency].rate;
          return { ...row, currency: newCurrency, rentAmount: newAmount.toFixed(2) };
        }
        return row;
      })
    );
    setShowCurrencyList(null);
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <div className="w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-2 text-center">Rent Bills</h2>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/12" rowSpan={2}>Sr. No</th>
                <th className="border p-2 w-1/3" colSpan={2}>Bill Time</th>
                <th className="border p-2 w-1/6" rowSpan={2}>Rent Amount</th>
                <th className="border p-2 w-1/6" rowSpan={2}>Billing Date</th>
                <th className="border p-2 w-1/6" rowSpan={2}>Remark</th>
                <th className="border p-2 w-1/12" rowSpan={2}>Actions</th>
              </tr>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/6">From</th>
                <th className="border p-2 w-1/6">To</th>
              </tr>
            </thead>

            <tbody>
              {rentBills.map((row, index) => (
                <tr key={row.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billFrom}
                      onChange={(e) => handleRentChange(index, "billFrom", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billTo}
                      onChange={(e) => handleRentChange(index, "billTo", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2 relative">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={row.rentAmount}
                        onChange={(e) => handleRentChange(index, "rentAmount", e.target.value)}
                        className="border p-1 w-full"
                      />
                      <button onClick={() => setShowCurrencyList(index)} className="p-1 border rounded">
                        {currencies[row.currency].icon}
                      </button>
                      {showCurrencyList === index && (
                        <div className="absolute bg-white border rounded shadow-lg p-2 mt-10 z-10">
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
                      type="date"
                      value={row.billingDate}
                      onChange={(e) => handleRentChange(index, "billingDate", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.remark}
                      onChange={(e) => handleRentChange(index, "remark", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button onClick={() => removeRentBill(index)} className="text-red-600 font-bold">✖</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={addRentBill} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
          ➕ Add Row
        </button>
      </div>
    </div>
  );
};

export default Rent;
