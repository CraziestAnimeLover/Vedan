import React, { useState ,useEffect } from "react";
import { LucideCoins } from "lucide-react";
import {
  DollarSign,
  Euro,
  PoundSterling,
  IndianRupee,
  JapaneseYen,
} from "lucide-react";
const API_BASE_URL = "http://localhost:8000/api/gym/water";

const currencies = {
  USD: { rate: 1, icon: <DollarSign size={16} /> },
  EUR: { rate: 0.92, icon: <Euro size={16} /> },
  GBP: { rate: 0.79, icon: <PoundSterling size={16} /> },
  INR: { rate: 82, icon: <IndianRupee size={16} /> },
  JPY: { rate: 150, icon: <JapaneseYen size={16} /> },
};



const WaterBill = () => {
  const [waterBottles, setWaterBottles] = useState([]);
  const [waterBills, setWaterBills] = useState([]);
  

  const [showCurrencyList, setShowCurrencyList] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEditBottle = (index) => {
    setEditingIndex(index);
  };


 // Fetch Data Function
 const fetchWaterData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/entries`);
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    console.log("Fetched Data:", data);

    setWaterBottles(data.bottles || []);
    setWaterBills(data.bills || []);
  } catch (error) {
    console.error("Error fetching water data:", error);
    alert("Failed to fetch water data.");
  }
};

// Fetch data on mount
useEffect(() => {
  fetchWaterData();
}, []);

useEffect(() => {
  console.log("Updated waterBottles:", waterBottles);
  console.log("Updated waterBills:", waterBills);
}, [waterBottles, waterBills]);


  const handleUpdateBottle = async (index) => {
    const updatedBottle = waterBottles[index];
  
    if (!updatedBottle.id) {
      alert("Error: No valid database ID found for this bottle.");
      return;
    }
  
    console.log("Updating bottle with data:", updatedBottle);
  
    try {
      const response = await fetch(
        `${API_BASE_URL}/entries/${updatedBottle.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBottle),
        }
      );
  
      const responseData = await response.json();
      console.log("Update response:", responseData);
  
      if (!response.ok) throw new Error(responseData.error || "Failed to update bottle");
  
      setEditingIndex(null);
      alert("Water bottle entry updated successfully!");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Error updating entry: " + error.message);
    }
  };
  
  
  

  const handleEditBill = (index) => {
    setEditingIndex(index);
  };

  const handleUpdateBill = async (index) => {
    const updatedBill = waterBills[index];
  
    if (!updatedBill.id) {
      alert("Error: No valid database ID found for this bill.");
      return;
    }
  
    try {
      const response = await fetch(
        `${API_BASE_URL}/entries/${updatedBill.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBill),
        }
      );
  
      if (!response.ok) throw new Error("Failed to update bill");
  
      setEditingIndex(null);
      alert("Water bill updated successfully!");
    } catch (error) {
      console.error("Update Error:", error);
      alert("Error updating bill: " + error.message);
    }
  };
  

  const handleCurrencyChange = (index, newCurrency) => {
    setWaterBills((prev) =>
      prev.map((row, i) => {
        if (i === index) {
          const currentCurrency = row.currency || "USD"; // Fallback if undefined
          const newAmount =
            (row.amount / currencies[currentCurrency].rate) *
            currencies[newCurrency].rate;
          return {
            ...row,
            currency: newCurrency,
            amount: newAmount.toFixed(2),
          };
        }
        return row;
      })
    );
    setShowCurrencyList(null);
  };

  const handleSubmit = async () => {
    const allEntries = [
      ...waterBottles.map((bottle) => ({
        type: "bottle",
        date: bottle.date, // ✅ Correct field for bottles
        quantity: Number(bottle.quantity),
      })),
      ...waterBills.map((bill) => ({
        type: "bill",
        billingDate: bill.billingDate, // ✅ Correct field for bills
        amount: Number(bill.amount),
        fromTime: bill.fromTime,
        toTime: bill.toTime,
        remarks: bill.remarks,
        currency: bill.currency,
      })),
    ];

    console.log("Submitting Data:", allEntries); // ✅ Check if billingDate exists

    try {
      for (const entry of allEntries) {
        const response = await fetch(`${API_BASE_URL}/entries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });

        const responseData = await response.json();
        console.log("Response Data:", responseData);

        if (!response.ok)
          throw new Error(responseData.error || "Failed to submit an entry");
      }

      alert("All data submitted successfully!");
      setWaterBottles([{ id: 1, date: "", quantity: "" }]);
      setWaterBills([
        {
          id: 1,
          billingDate: "",
          amount: "",
          fromTime: "",
          toTime: "",
          remarks: "",
          currency: "USD",
        },
      ]);
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Error submitting data: " + error.message);
    }
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
    setWaterBottles([
      ...waterBottles,
      { id: waterBottles.length + 1, date: "", quantity: "" },
    ]);
  };

  const removeWaterBottle = (index) => {
    setWaterBottles(waterBottles.filter((_, i) => i !== index));
  };

  const addWaterBill = () => {
    setWaterBills([
      ...waterBills,
      {
        id: waterBills.length + 1,
        billingDate: "",
        amount: "",
        fromTime: "",
        toTime: "",
        remarks: "",
        currency: "USD",
      },
    ]);
  };

  const removeWaterBill = (index) => {
    setWaterBills(waterBills.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
     
      <div className="w-full max-w-4xl">
        {/* Water Bottles Table */}
        <h2 className="text-lg font-semibold mb-2 text-center">
          Water Bottles
        </h2>
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
                      onChange={(e) =>
                        handleBottleChange(index, "date", e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) =>
                        handleBottleChange(index, "quantity", e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    {editingIndex === index ? (
                      <button
                        onClick={() => handleUpdateBottle(index)}
                        className="text-green-600 font-bold"
                      >
                        ✅
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditBottle(index)}
                        className="text-blue-600 font-bold"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => removeWaterBottle(index)}
                      className="text-red-600 font-bold ml-2"
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addWaterBottle}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          ➕ Add Row
        </button>

        {/* Water Bill Table */}
        <h2 className="text-lg font-semibold mt-6 mb-2 text-center">
          Water Bills
        </h2>
        <div className="overflow-x-auto overflow-y-auto max-h-96 border border-gray-300">
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/12" rowSpan={2}>
                  Sr. No
                </th>
                <th className="border p-2 w-1/6" rowSpan={2}>
                  Billing Date
                </th>
                <th className="border p-2 w-1/6" rowSpan={2}>
                  Bill Amount
                </th>
                <th className="border p-2 w-1/4" colSpan={2}>
                  Bill Time
                </th>
                <th className="border p-2 w-1/6" rowSpan={2}>
                  Remarks
                </th>
                <th className="border p-2 w-1/12" rowSpan={2}>
                  Actions
                </th>
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
                      onChange={(e) =>
                        handleBillChange(index, "billingDate", e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2 flex items-center space-x-2">
                    <input
                      type="number"
                      value={row.amount}
                      onChange={(e) =>
                        handleBillChange(index, "amount", e.target.value)
                      }
                      className="border p-1 w-full"
                    />

                    <div className="relative flex items-center space-x-1">
                      <span className="text-gray-700">
                        {currencies[row.currency]?.icon}{" "}
                      </span>

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
                              onClick={() =>
                                handleCurrencyChange(index, currency)
                              }
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
                      onChange={(e) =>
                        handleBillChange(index, "fromTime", e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="time"
                      value={row.toTime}
                      onChange={(e) =>
                        handleBillChange(index, "toTime", e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.remarks}
                      onChange={(e) =>
                        handleBillChange(index, "remarks", e.target.value)
                      }
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    {editingIndex === index ? (
                      <button
                        onClick={() => handleUpdateBill(index)}
                        className="text-green-600 font-bold"
                      >
                        ✅
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditBill(index)}
                        className="text-blue-600 font-bold"
                      >
                        ✏️
                      </button>
                    )}
                    <button
                      onClick={() => removeWaterBill(index)}
                      className="text-red-600 font-bold ml-2"
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addWaterBill}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
        >
          ➕ Add Row
        </button>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default WaterBill;
