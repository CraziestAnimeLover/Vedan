import React, { useState, useEffect } from "react";
import { DollarSign, Euro, PoundSterling, IndianRupee, JapaneseYen } from "lucide-react";

const API_BASE_URL = "http://localhost:8000/api/gymequipmentbills";

const currencies = {
  USD: { rate: 1, icon: <DollarSign size={16} /> },
  EUR: { rate: 0.92, icon: <Euro size={16} /> },
  GBP: { rate: 0.79, icon: <PoundSterling size={16} /> },
  INR: { rate: 82, icon: <IndianRupee size={16} /> },
  JPY: { rate: 150, icon: <JapaneseYen size={16} /> },
};

const EquipmentsBill = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Bills from Backend
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}`);
        const data = await response.json();
        setEquipments(data.map((bill) => ({ ...bill, isEditing: false })));
        setLoading(false);
      } catch (error) {
        console.error("❗ Error fetching bills:", error);
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  // ✅ Handle Input Changes
  const handleEquipmentChange = (index, field, value) => {
    setEquipments((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  // ✅ Toggle Edit Mode
  const toggleEdit = (index) => {
    setEquipments((prev) =>
      prev.map((row, i) => (i === index ? { ...row, isEditing: !row.isEditing } : row))
    );
  };

  // ✅ Submit Updated Bill
  const handleUpdate = async (index) => {
    const updatedBill = equipments[index];

    try {
      const response = await fetch(`${API_BASE_URL}/${updatedBill._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBill),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      setEquipments((prev) =>
        prev.map((row, i) => (i === index ? { ...row, isEditing: false } : row))
      );
      alert("✅ Bill updated successfully!");
    } catch (error) {
      console.error("❗ Error updating bill:", error);
    }
  };

  // ✅ Submit New Bills
  const handleSubmit = async () => {
    const newBills = equipments.filter((e) => !e._id);

    try {
      const response = await fetch(`${API_BASE_URL}/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bills: newBills }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      alert("✅ New bills submitted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("❗ Error submitting bills:", error);
    }
  };

  // ✅ Add New Row
  const addEquipment = () => {
    setEquipments([
      ...equipments,
      { description: "", quantity: "", price: "", currency: "USD", convertedPrice: "", isEditing: true },
    ]);
  };

  // ✅ Delete Bill
  const deleteBill = async (id, index) => {
    if (!id) {
      setEquipments(equipments.filter((_, i) => i !== index));
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      setEquipments(equipments.filter((_, i) => i !== index));
      alert("✅ Bill deleted successfully!");
    } catch (error) {
      console.error("❗ Error deleting bill:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center w-full">
      <div className="w-full max-w-4xl">
        <h2 className="text-lg font-semibold mb-2 text-center">Equipments Bill</h2>

        {loading ? (
          <p className="text-center">⏳ Loading...</p>
        ) : (
          <div className="overflow-x-auto max-h-96">
            <table className="w-full table-fixed border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2 w-1/12">Sr. No</th>
                  <th className="border p-2 w-1/3">Description</th>
                  <th className="border p-2 w-1/4">Quantity</th>
                  <th className="border p-2 w-1/4">Price</th>
                  <th className="border p-2 w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {equipments.map((row, index) => (
                  <tr key={row._id || index}>
                    <td className="border p-2 text-center">{index + 1}</td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={row.description}
                        onChange={(e) => handleEquipmentChange(index, "description", e.target.value)}
                        className="border p-1 w-full"
                        disabled={!row.isEditing}
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={row.quantity}
                        onChange={(e) => handleEquipmentChange(index, "quantity", e.target.value)}
                        className="border p-1 w-full"
                        min="0"
                        disabled={!row.isEditing}
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        value={row.price}
                        onChange={(e) => handleEquipmentChange(index, "price", e.target.value)}
                        className="border p-1 w-full"
                        min="0"
                        disabled={!row.isEditing}
                      />
                    </td>
                    <td className="border p-2 text-center">
                      {row.isEditing ? (
                        <button onClick={() => handleUpdate(index)} className="text-green-600 font-bold">✔</button>
                      ) : (
                        <button onClick={() => toggleEdit(index)} className="text-blue-600 font-bold">✏</button>
                      )}
                      <button onClick={() => deleteBill(row._id, index)} className="text-red-600 font-bold ml-2">✖</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex gap-4">
          <button onClick={addEquipment} className="px-3 py-1 bg-blue-500 text-white rounded">➕ Add Row</button>
          <button onClick={handleSubmit} className="px-3 py-1 bg-green-500 text-white rounded">✅ Submit</button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentsBill;
