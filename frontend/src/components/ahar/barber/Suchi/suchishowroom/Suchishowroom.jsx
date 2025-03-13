import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash, FiEdit, FiSave } from "react-icons/fi";
import axios from "axios";
import CategoryPopup from "../CategoryPopup";

const Suchishowroom = () => {
  const [inventory, setInventory] = useState([]);
  const [showCategoryPopup, setShowCategoryPopup] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  // 🔄 Fetch Inventory from Backend
  useEffect(() => {
    axios.get("http://localhost:8000/api/aharshowroom")
      .then((res) => setInventory(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // ✅ Handle Input Change
  const handleChange = (id, field, value) => {
    setInventory((prev) =>
      prev.map((item) =>
        (item.id || item._id) === id
          ? { ...item, [field]: value, total: field === "price" || field === "quantity" ? item.price * item.quantity : item.total }
          : item
      )
    );
  };

  // ✅ Add New Inventory Row
  const addRow = () => {
    const newItem = {
      name: "",
      pic: null,
      category: "",
      expireDate: "",
      price: "",
      manufacturing: "",
      quantity: 0,
      total: 0,
      description: null,
    };
    setInventory([...inventory, newItem]);
  };

  // ✅ Delete Inventory Item (Backend)
  const deleteRow = async (id) => {
    try {
      if (id) {
        await axios.delete(`http://localhost:8000/api/aharshowroom/${id}`);
      }
      setInventory(inventory.filter((item) => item.id !== id && item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // ✅ Submit Inventory to Backend
  const handleSubmit = async () => {
    try {
      for (const item of inventory) {
        const formData = new FormData();

        // Append only non-null and non-undefined values
        Object.entries(item).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });

        const response = await axios.post(
          "http://localhost:8000/api/aharshowroom",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("Data submitted:", response.data);
      }

      alert("Inventory submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      const errorMessage = error.response?.data?.message || error.message || "Unknown error";
      alert("Error submitting data: " + errorMessage);
    }
  };

  // ✅ Update Inventory Item in Backend
  const handleUpdate = async (id) => {
    try {
      const itemToUpdate = inventory.find((item) => item._id === id);

      if (!itemToUpdate) return;

      const response = await axios.put(
        `http://localhost:8000/api/aharshowroom/${id}`,
        itemToUpdate
      );

      console.log("Updated item:", response.data);
      alert("Item updated successfully!");
      setEditingItemId(null);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <button onClick={addRow} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center gap-2">
        <FiPlus /> Add Row
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sr. No</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Expire Date</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item._id} className="text-center relative">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item._id, "name", e.target.value)}
                  className="border rounded p-1"
                  disabled={editingItemId !== item._id}
                />
              </td>
              <td className="border p-2">
                <button className="text-blue-500 underline" onClick={() => setShowCategoryPopup(item._id)}>
                  {item.category || "Select Category"}
                </button>
                {showCategoryPopup === item._id && (
                  <CategoryPopup
                    onSelect={(category) => handleChange(item._id, "category", category)}
                    onClose={() => setShowCategoryPopup(null)}
                  />
                )}
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={item.expireDate}
                  onChange={(e) => handleChange(item._id, "expireDate", e.target.value)}
                  disabled={editingItemId !== item._id}
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => handleChange(item._id, "price", Number(e.target.value))}
                  disabled={editingItemId !== item._id}
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleChange(item._id, "quantity", Number(e.target.value))}
                  disabled={editingItemId !== item._id}
                />
              </td>
              <td className="border p-2">{item.price * item.quantity}</td>
              <td className="border p-2 flex justify-center gap-2">
                {editingItemId === item._id ? (
                  <button onClick={() => handleUpdate(item._id)} className="text-green-500">
                    <FiSave />
                  </button>
                ) : (
                  <button onClick={() => setEditingItemId(item._id)} className="text-blue-500">
                    <FiEdit />
                  </button>
                )}
                <button onClick={() => deleteRow(item._id)} className="text-red-500">
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleSubmit} className="bg-purple-500 text-white px-4 py-2 rounded mt-4">
        Submit
      </button>
    </div>
  );
};

export default Suchishowroom;
