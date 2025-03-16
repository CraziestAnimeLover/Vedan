import React, { useState, useEffect } from "react";
import axios from "axios";
import { DollarSign, Euro, PoundSterling, IndianRupee, JapaneseYen } from "lucide-react";

const API_URL = "http://localhost:8000/api/wifibills";

const currencies = {
  USD: { rate: 1, icon: <DollarSign size={16} /> },
  EUR: { rate: 0.92, icon: <Euro size={16} /> },
  GBP: { rate: 0.79, icon: <PoundSterling size={16} /> },
  INR: { rate: 82, icon: <IndianRupee size={16} /> },
  JPY: { rate: 150, icon: <JapaneseYen size={16} /> },
};

const WifiBill = () => {
  const [wifiBills, setWifiBills] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get(API_URL);
      setWifiBills(response.data);
    } catch (error) {
      console.error("Error fetching WiFi bills", error);
    }
  };

  const addWifiBill = () => {
    setWifiBills([
      ...wifiBills,
      {
        id: Date.now(),
        billingFrom: "",
        billingTo: "",
        wifiPackagePrice: "",
        validity: "",
        remark: "",
        billingDate: "",
        currency: "USD",
      },
    ]);
  };

  const handleBillChange = (index, field, value) => {
    setWifiBills((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const removeWifiBill = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setWifiBills(wifiBills.filter((bill) => bill.id !== id));
    } catch (error) {
      console.error("Error deleting bill", error);
    }
  };

  const updateWifiBill = async (index) => {
    const bill = wifiBills[index];
    try {
      await axios.put(`${API_URL}/${bill.id}`, bill);
      setEditingIndex(null);
      fetchBills();
    } catch (error) {
      console.error("Error updating WiFi bill", error);
    }
  };
  const submitAllBills = async () => {
    try {
      const payload = { bills: wifiBills };
      const response = await axios.post(`${API_URL}/bulk`, payload);
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting all bills:", error.response?.data || error);
    }
  };
  
  
  

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <div className="w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-2 text-center">WiFi Bills</h2>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full table-fixed border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 w-1/12">Sr. No</th>
                <th className="border p-2 w-1/6">Billing From</th>
                <th className="border p-2 w-1/6">Billing To</th>
                <th className="border p-2 w-1/6">WiFi Package Price</th>
                <th className="border p-2 w-1/6">Validity</th>
                <th className="border p-2 w-1/6">Remark</th>
                <th className="border p-2 w-1/6">Billing Date</th>
                <th className="border p-2 w-1/6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {wifiBills.map((row, index) => (
                <tr key={row.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billingFrom}
                      onChange={(e) => handleBillChange(index, "billingFrom", e.target.value)}
                      className="border p-1 w-full"
                      disabled={editingIndex !== index}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billingTo}
                      onChange={(e) => handleBillChange(index, "billingTo", e.target.value)}
                      className="border p-1 w-full"
                      disabled={editingIndex !== index}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.wifiPackagePrice}
                      onChange={(e) => handleBillChange(index, "wifiPackagePrice", e.target.value)}
                      className="border p-1 w-full"
                      disabled={editingIndex !== index}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.validity}
                      onChange={(e) => handleBillChange(index, "validity", e.target.value)}
                      className="border p-1 w-full"
                      disabled={editingIndex !== index}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      value={row.remark}
                      onChange={(e) => handleBillChange(index, "remark", e.target.value)}
                      className="border p-1 w-full"
                      disabled={editingIndex !== index}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="date"
                      value={row.billingDate}
                      onChange={(e) => handleBillChange(index, "billingDate", e.target.value)}
                      className="border p-1 w-full"
                      disabled={editingIndex !== index}
                    />
                  </td>
                  <td className="border p-2 text-center">
                    {editingIndex === index ? (
                      <button
                        onClick={() => updateWifiBill(index)}
                        className="text-green-600 font-bold mr-2"
                      >
                        🔄 Update
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingIndex(index)}
                        className="text-blue-600 font-bold mr-2"
                      >
                        ✏️ Edit
                      </button>
                    )}
                    <button
                      onClick={() => removeWifiBill(row.id)}
                      className="text-red-600 font-bold"
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={addWifiBill} className="px-3 py-1 bg-blue-500 text-white rounded">
            ➕ Add Row
          </button>
          <button onClick={submitAllBills} className="px-3 py-1 bg-green-500 text-white rounded">
            🚀 Submit All
          </button>
        </div>
      </div>
    </div>
  );
};

export default WifiBill;
