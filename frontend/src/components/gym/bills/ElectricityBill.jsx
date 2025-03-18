import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/gym/electricitybills";

const ElectricityBill = () => {
  const [electricityBills, setElectricityBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchElectricityBills();
  }, []);

  const fetchElectricityBills = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setElectricityBills(data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBillChange = (index, field, value) => {
    setElectricityBills((prev) =>
      prev.map((bill, i) => (i === index ? { ...bill, [field]: value } : bill))
    );
  };

  const addElectricityBill = () => {
    const tempId = `temp-${Date.now()}`;
    const newBill = {
      id: tempId,
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

  const saveElectricityBill = async (index) => {
    let billToSave = electricityBills[index];
  
    console.log("Saving bill:", billToSave);
  
    if (!billToSave._id && billToSave.id?.startsWith("temp")) {
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(billToSave),
        });
  
        if (!response.ok) throw new Error("Failed to save bill.");
  
        const savedBill = await response.json();
        console.log("✅ Backend Response:", savedBill);
  
        if (!savedBill || !savedBill._id) {
          console.warn("⚠ Warning: Backend did not return a valid _id.");
          return;
        }
  
        setElectricityBills((prev) =>
          prev.map((bill) =>
            bill.id === billToSave.id ? { ...savedBill, id: savedBill._id } : bill
          )
        );
      } catch (error) {
        console.error("❌ Error saving bill:", error);
      }
    } else {
      updateElectricityBill(index);
    }
  };
  
  const updateElectricityBill = async (index) => {
    const billToUpdate = electricityBills[index];
  
    if (!billToUpdate._id) {
      alert("Save the new bill first before updating.");
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/${billToUpdate._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(billToUpdate),
      });
  
      if (!response.ok) throw new Error("Failed to update bill.");
  
      console.log("✅ Successfully updated:", billToUpdate);
  
      setElectricityBills((prev) =>
        prev.map((bill, i) => (i === index ? billToUpdate : bill))
      );
    } catch (error) {
      console.error("Error updating bill:", error);
    }
  };
  
  

  const removeElectricityBill = async (index, id) => {
    if (!id || id.startsWith("temp")) {
      setElectricityBills((prev) => prev.filter((_, i) => i !== index));
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete bill.");
      setElectricityBills((prev) => prev.filter((bill) => bill.id !== id));
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  return (
    <div className="w-full max-w-4xl overflow-hidden">
      <h2 className="text-lg font-semibold mb-2 text-center">Electricity Bills</h2>

      {loading ? (
        <p className="text-center">Loading bills...</p>
      ) : (
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
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billFrom}
                      onChange={(e) => handleBillChange(index, "billFrom", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billTo}
                      onChange={(e) => handleBillChange(index, "billTo", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.billAmount}
                      onChange={(e) => handleBillChange(index, "billAmount", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billDate}
                      onChange={(e) => handleBillChange(index, "billDate", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.billUnit}
                      onChange={(e) => handleBillChange(index, "billUnit", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.remark}
                      onChange={(e) => handleBillChange(index, "remark", e.target.value)}
                      className="border p-1 w-full"
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => saveElectricityBill(index)}
                      className="text-green-600 font-bold mr-2"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={() => removeElectricityBill(index, row.id)}
                      className="text-red-600 font-bold"
                    >
                      ✖ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button onClick={addElectricityBill} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
        ➕ Add Row
      </button>
    </div>
  );
};

export default ElectricityBill;
