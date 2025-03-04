import React, { useState } from "react";
import { DollarSign, Euro, PoundSterling, IndianRupee, JapaneseYen } from "lucide-react";

const currencies = {
  USD: { rate: 1, icon: <DollarSign size={16} /> },
  EUR: { rate: 0.92, icon: <Euro size={16} /> },
  GBP: { rate: 0.79, icon: <PoundSterling size={16} /> },
  INR: { rate: 82, icon: <IndianRupee size={16} /> },
  JPY: { rate: 150, icon: <JapaneseYen size={16} /> },
};

const Fees = () => {
  const [feesData, setFeesData] = useState([
    { id: 1, student: "", feeFrom: "", feeTo: "", amount: "", paymentDate: "", remark: "", currency: "USD" },
  ]);
  const [showCurrencyList, setShowCurrencyList] = useState(null);

  const handleInputChange = (index, field, value) => {
    setFeesData((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addFeeRow = () => {
    setFeesData([
      ...feesData,
      { id: feesData.length + 1, student: "", feeFrom: "", feeTo: "", amount: "", paymentDate: "", remark: "", currency: "USD" },
    ]);
  };

  const removeFeeRow = (index) => {
    setFeesData(feesData.filter((_, i) => i !== index));
  };

  const handleCurrencyChange = (index, newCurrency) => {
    setFeesData((prev) =>
      prev.map((row, i) => {
        if (i === index) {
          const newAmount = (row.amount / currencies[row.currency].rate) * currencies[newCurrency].rate;
          return { ...row, currency: newCurrency, amount: newAmount.toFixed(2) };
        }
        return row;
      })
    );
    setShowCurrencyList(null);
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <div className="w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-2 text-center">Fees Details</h2>
        <div className="overflow-x-auto">
  <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="border p-2 min-w-[50px]">Sr. No</th>
        <th className="border p-2 min-w-[150px]">Student</th>
        <th className="border p-2 min-w-[200px]">Fee Time</th>
        <th className="border p-2 min-w-[130px]">Amount</th>
        <th className="border p-2 min-w-[130px]">Payment Date</th>
        <th className="border p-2 min-w-[150px]">Remark</th>
        <th className="border p-2 min-w-[50px]">Actions</th>
      </tr>
    </thead>
    <tbody>
      {feesData.map((row, index) => (
        <tr key={row.id}>
          <td className="border p-2 text-center">{index + 1}</td>
          <td className="border p-2">
            <input
              type="text"
              value={row.student}
              onChange={(e) => handleInputChange(index, "student", e.target.value)}
              className="border p-1 w-full"
            />
          </td>
          <td className="border p-2">
            <div className="flex gap-2">
              <input
                type="time"
                value={row.feeFrom}
                onChange={(e) => handleInputChange(index, "feeFrom", e.target.value)}
                className="border p-1 w-1/2"
              />
              <input
                type="time"
                value={row.feeTo}
                onChange={(e) => handleInputChange(index, "feeTo", e.target.value)}
                className="border p-1 w-1/2"
              />
            </div>
          </td>
          <td className="border p-2 relative">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={row.amount}
                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                className="border p-1 w-[80px]"
              />
              <button onClick={() => setShowCurrencyList(index)} className="p-1 border rounded">
                {currencies[row.currency].icon}
              </button>
              {showCurrencyList === index && (
                <div className="absolute bg-white border rounded shadow-lg p-2 right-0 z-10">
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
              value={row.paymentDate}
              onChange={(e) => handleInputChange(index, "paymentDate", e.target.value)}
              className="border p-1 w-full"
            />
          </td>
          <td className="border p-2">
            <input
              type="text"
              value={row.remark}
              onChange={(e) => handleInputChange(index, "remark", e.target.value)}
              className="border p-1 w-full"
            />
          </td>
          <td className="border p-2 text-center">
            <button onClick={() => removeFeeRow(index)} className="text-red-600 font-bold">✖</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        <button onClick={addFeeRow} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
          ➕ Add Row
        </button>
      </div>
    </div>
  );
};

export default Fees;