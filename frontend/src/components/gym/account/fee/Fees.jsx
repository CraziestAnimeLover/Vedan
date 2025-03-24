import React, { useState, useEffect } from "react";
import { DollarSign, Euro, PoundSterling, IndianRupee, JapaneseYen } from "lucide-react";

const currencies = {
  USD: { rate: 1, icon: <DollarSign size={16} /> },
  EUR: { rate: 0.92, icon: <Euro size={16} /> },
  GBP: { rate: 0.79, icon: <PoundSterling size={16} /> },
  INR: { rate: 82, icon: <IndianRupee size={16} /> },
  JPY: { rate: 150, icon: <JapaneseYen size={16} /> },
};

const API_BASE_URL = "http://localhost:8000/api/gym/fees";

const Fees = () => {
  const [feesData, setFeesData] = useState([]);

  useEffect(() => {
    fetch(API_BASE_URL)
      .then((res) => res.json())
      .then((data) => setFeesData(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching fees:", err));
  }, []);

  const handleInputChange = (index, field, value) => {
    setFeesData((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const addFeeRow = () => {
    const newFee = {
      student: "John vs Doe",
      feeFrom: "10:00",
      feeTo: "12:00",
      amount: 100,
      paymentDate: "2025-03-19",
      remark: "Monthly fee",
      currency: "USD",
    };
  
    fetch(API_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFee),
    })
      .then((res) => res.json())
      .then((data) => {
        setFeesData((prev) => [...prev, { ...data, isEditing: true }]);
      })
      .catch((err) => console.error("Error adding fee:", err));
  };
  
  

  const removeFeeRow = async (id) => {
    if (!id) return; // Ensure id exists
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      setFeesData((prev) => prev.filter((row) => row._id !== id));
    } catch (err) {
      console.error("Error deleting fee:", err);
    }
  };
  

  const updateFeeRow = async (index, id) => {
    if (!id) return; // Ensure id exists
    const updatedFee = feesData[index];
  
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFee),
      });
      setFeesData((prev) =>
        prev.map((row, i) => (i === index ? { ...row, isEditing: false } : row))
      );
    } catch (err) {
      console.error("Error updating fee:", err);
    }
  };
  

  const toggleEditMode = (index) => {
    setFeesData((prev) =>
      prev.map((row, i) => (i === index ? { ...row, isEditing: !row.isEditing } : row))
    );
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <div className="w-full max-w-5xl">
        <h2 className="text-lg font-semibold mb-4 text-center">Fees Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Sr. No</th>
                <th className="border p-2">Student</th>
                <th className="border p-2">Fee Time</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Payment Date</th>
                <th className="border p-2">Remark</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
  {feesData.map((row, index) => (
   <tr key={row._id || index}>

      <td className="border p-2">{index + 1}</td>

                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.student}
                      onChange={(e) => handleInputChange(index, "student", e.target.value)}
                      className="border p-1 w-full"
                      disabled={!row.isEditing}
                    />
                  </td>
                  <td className="border p-2 flex gap-2">
                    <input
                      type="time"
                      value={row.feeFrom}
                      onChange={(e) => handleInputChange(index, "feeFrom", e.target.value)}
                      className="border p-1 w-1/2"
                      disabled={!row.isEditing}
                    />
                    <input
                      type="time"
                      value={row.feeTo}
                      onChange={(e) => handleInputChange(index, "feeTo", e.target.value)}
                      className="border p-1 w-1/2"
                      disabled={!row.isEditing}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.amount}
                      onChange={(e) => handleInputChange(index, "amount", Number(e.target.value))}

                      className="border p-1 w-full"
                      disabled={!row.isEditing}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.paymentDate}
                      onChange={(e) => handleInputChange(index, "paymentDate", e.target.value)}
                      className="border p-1 w-full"
                      disabled={!row.isEditing}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.remark}
                      onChange={(e) => handleInputChange(index, "remark", e.target.value)}
                      className="border p-1 w-full"
                      disabled={!row.isEditing}
                    />
                  </td>
                  <td className="border p-2 flex gap-2 justify-center">
                    {row.isEditing ? (
                      <button onClick={() => updateFeeRow(index, row._id)} className="text-blue-500">💾 Save</button>

                    ) : (
                      <button onClick={() => toggleEditMode(index)} className="text-green-500">✏️ Edit</button>
                    )}
                    <button onClick={() => removeFeeRow(row._id)} className="text-red-500">❌ Delete</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addFeeRow} className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">➕ Add Row</button>
      </div>
    </div>
  );
};

export default Fees;
