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

const EquipmentsBill = () => {
  const [equipments, setEquipments] = useState([
    { id: 1, description: "", quantity: "", price: "", currency: "USD", convertedPrice: "" },
  ]);

  const [showCurrencyList, setShowCurrencyList] = useState(null);

  const handleCurrencyChange = (index, newCurrency) => {
    setEquipments((prev) =>
      prev.map((row, i) => {
        if (i === index) {
          const convertedAmount = (parseFloat(row.price || 0) / currencies[row.currency].rate) * currencies[newCurrency].rate;
          return { ...row, currency: newCurrency, convertedPrice: convertedAmount.toFixed(2) };
        }
        return row;
      })
    );
    setTimeout(() => setShowCurrencyList(null), 100); // Prevent immediate dropdown close
  };

  const handleEquipmentChange = (index, field, value) => {
    setEquipments((prev) =>
      prev.map((row, i) => {
        if (i === index) {
          let newValue = value;
          if (field === "quantity" || field === "price") {
            newValue = value === "" ? "" : Math.max(0, parseFloat(value)); // Prevent negative values
          }
          return { ...row, [field]: newValue };
        }
        return row;
      })
    );
  };

  const addEquipment = () => {
    setEquipments([
      ...equipments,
      { id: equipments.length + 1, description: "", quantity: "", price: "", currency: "USD", convertedPrice: "" },
    ]);
  };

  const removeEquipment = (index) => {
    setEquipments(equipments.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <div className="w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-2 text-center">Equipments Bill</h2>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/12">Sr. No</th>
                <th className="border p-2 w-1/3">Description</th>
                <th className="border p-2 w-1/4">Quantity</th>
                <th className="border p-2 w-1/4">Price</th>
                <th className="border p-2 w-1/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipments.map((row, index) => (
                <tr key={row.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => handleEquipmentChange(index, "description", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => handleEquipmentChange(index, "quantity", e.target.value)}
                      className="border p-1 w-full"
                      min="0"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.price}
                      onChange={(e) => handleEquipmentChange(index, "price", e.target.value)}
                      className="border p-1 w-full"
                      min="0"
                    />
                    <div className="relative">
                      <button onClick={() => setShowCurrencyList(index)} className="p-1 border rounded">
                        {currencies[row.currency].icon}
                      </button>
                      {showCurrencyList === index && (
                        <div className="absolute bg-white border rounded shadow-lg p-2 mt-2 z-10">
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
                    {row.convertedPrice && (
                      <div className="text-sm text-gray-600 mt-1">
                        ≈ {row.convertedPrice} {row.currency}
                      </div>
                    )}
                  </td>
                  <td className="border p-2 text-center">
                    <button onClick={() => removeEquipment(index)} className="text-red-600 font-bold">
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button onClick={addEquipment} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
          ➕ Add Row
        </button>
      </div>
    </div>
  );
};

export default EquipmentsBill;
