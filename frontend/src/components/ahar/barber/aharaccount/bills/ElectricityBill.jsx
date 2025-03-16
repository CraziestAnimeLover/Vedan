import React, { useState, useEffect } from "react";
import { DollarSign, Euro, PoundSterling, IndianRupee, JapaneseYen } from "lucide-react";

const API_URL = "http://localhost:8000/electricitybills"; // Adjust API URL accordingly

const currencies = {
  USD: { rate: 1, icon: <DollarSign size={16} /> },
  EUR: { rate: 0.92, icon: <Euro size={16} /> },
  GBP: { rate: 0.79, icon: <PoundSterling size={16} /> },
  INR: { rate: 82, icon: <IndianRupee size={16} /> },
  JPY: { rate: 150, icon: <JapaneseYen size={16} /> },
};

const ElectricityBill = () => {
  const [electricityBills, setElectricityBills] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchElectricityBills();
  }, []);

  // Fetch existing bills from backend
  const fetchElectricityBills = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setElectricityBills(data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  const handleBillChange = (index, field, value) => {
    setElectricityBills((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addElectricityBill = () => {
    const newBill = {
      id: Date.now(), // Temporary ID
      billFrom: new Date().toISOString().split("T")[0], 
      billTo: new Date().toISOString().split("T")[0],
      billAmount: 0,
      billDate: new Date().toISOString().split("T")[0],
      billUnit: "",
      remark: "",
      currency: "USD",
    };
  
    setElectricityBills((prev) => [...prev, newBill]);
  };
  
  
  const removeElectricityBill = async (index, id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setElectricityBills(electricityBills.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  const editElectricityBill = (index) => {
    setEditingIndex(index);
  };

  const updateElectricityBill = async (index) => {
    const billToUpdate = electricityBills[index];

    try {
      await fetch(`${API_URL}/${billToUpdate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billToUpdate),
      });

      setEditingIndex(null);
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("Submitting Bills:", electricityBills);
  
    try {
      const response = await fetch("http://localhost:8000/electricitybills/bulk", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bills: electricityBills }),  
      });
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      if (response.ok) {
        alert("Bills submitted successfully!");
        setElectricityBills([]); // Clear the table
      } else {
        console.error("Failed to submit bills:", data);
      }
    } catch (error) {
      console.error("Error submitting bills:", error);
    }
  };
  
  return (
    <div className="w-full max-w-4xl overflow-hidden">
      <h2 className="text-lg font-semibold mb-2 text-center">Electricity Bills</h2>

      <div className="overflow-x-auto max-h-96">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Sr. No</th>
              <th className="border p-2">Bill From</th>
              <th className="border p-2">Bill To</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2">Remark</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {electricityBills.map((row, index) => (
              <tr key={row.id}>
                <td className="border p-2 text-center">{index + 1}</td>
                <td className="border p-2"><input type="date" value={row.billFrom} onChange={(e) => handleBillChange(index, "billFrom", e.target.value)} className="border p-1 w-full" /></td>
                <td className="border p-2"><input type="date" value={row.billTo} onChange={(e) => handleBillChange(index, "billTo", e.target.value)} className="border p-1 w-full" /></td>
                <td className="border p-2"><input type="number" value={row.billAmount} onChange={(e) => handleBillChange(index, "billAmount", e.target.value)} className="border p-1 w-full" /></td>
                <td className="border p-2"><input type="date" value={row.billDate} onChange={(e) => handleBillChange(index, "billDate", e.target.value)} className="border p-1 w-full" /></td>
                <td className="border p-2"><input type="text" value={row.billUnit} onChange={(e) => handleBillChange(index, "billUnit", e.target.value)} className="border p-1 w-full" /></td>
                <td className="border p-2"><input type="text" value={row.remark} onChange={(e) => handleBillChange(index, "remark", e.target.value)} className="border p-1 w-full" /></td>
                <td className="border p-2 text-center">
                  {editingIndex === index ? (
                    <button onClick={() => updateElectricityBill(index)} className="text-green-600 font-bold mr-2">✔</button>
                  ) : (
                    <button onClick={() => editElectricityBill(index)} className="text-blue-600 font-bold mr-2">✎</button>
                  )}
                  <button onClick={() => removeElectricityBill(index, row.id)} className="text-red-600 font-bold">✖</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={addElectricityBill} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded mr-2">➕ Add Row</button>
      <button onClick={handleSubmit} className="mt-2 px-3 py-1 bg-green-500 text-white rounded">Submit</button>
    </div>
  );
};

export default ElectricityBill;
