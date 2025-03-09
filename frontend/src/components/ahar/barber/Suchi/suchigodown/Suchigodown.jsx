import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import CategoryPopup from "../CategoryPopup"; // Import the CategoryPopup component

const Suchigodown = () => {
  const [inventory, setInventory] = useState([]);
  const [showCategoryPopup, setShowCategoryPopup] = useState(null);
  const [editMode, setEditMode] = useState(null);

  const handleChange = (id, field, value) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value, total: field === "price" || field === "quantity" ? item.price * item.quantity : item.total }
          : item
      )
    );
  };

  const handleFileUpload = (id, field, file) => {
    handleChange(id, field, file);
  };

  const addRow = () => {
    setInventory([...inventory, { id: Date.now(), name: "", pic: null, category: "", expireDate: "", price: "", manufacturing: "", quantity: 0, total: 0, description: null }]);
  };

  const deleteRow = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleCategorySelect = (id, category) => {
    handleChange(id, "category", category);
    setShowCategoryPopup(null);
  };

  const handleSubmit = () => {
    console.log("Submitting Inventory Data:", inventory);
    alert("Inventory submitted successfully!");
  };

  const handleUpdate = (id) => {
    setEditMode(id);
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
            <th className="border p-2">Name</th> {/* NEW Name Column */}
            <th className="border p-2">Pic</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Expire Date</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Manufacturing</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item.id} className="text-center relative">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item.id, "name", e.target.value)}
                  className="border rounded p-1"
                />
              </td>
              <td className="border p-2">
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(item.id, "pic", e.target.files[0])} />
              </td>
              <td className="border p-2 relative">
                <button
                  className="text-blue-500 underline"
                  onClick={() => setShowCategoryPopup(showCategoryPopup === item.id ? null : item.id)}
                >
                  {item.category ? item.category : "Select Category"}
                </button>

                {showCategoryPopup === item.id && (
                  <CategoryPopup
                    onSelect={(category) => handleCategorySelect(item.id, category)}
                    onClose={() => setShowCategoryPopup(null)}
                  />
                )}
              </td>
              <td className="border p-2">
                <input type="date" value={item.expireDate} onChange={(e) => handleChange(item.id, "expireDate", e.target.value)} />
              </td>
              <td className="border p-2">
                <input type="number" value={item.price} onChange={(e) => handleChange(item.id, "price", Number(e.target.value))} />
              </td>
              <td className="border p-2">
                <input type="text" value={item.manufacturing} onChange={(e) => handleChange(item.id, "manufacturing", e.target.value)} />
              </td>
              <td className="border p-2">
                <input type="number" value={item.quantity} onChange={(e) => handleChange(item.id, "quantity", Number(e.target.value))} />
              </td>
              <td className="border p-2">{item.price * item.quantity}</td>
              <td className="border p-2">
                <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(item.id, "description", e.target.files[0])} />
              </td>
              <td className="border p-2 flex justify-center gap-2">
                <button onClick={() => deleteRow(item.id)} className="text-red-500">
                  <FiTrash />
                </button>
                <button onClick={() => handleUpdate(item.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                  {editMode === item.id ? "Editing" : "Update"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {inventory.length > 0 && (
        <div className="mt-4 text-center">
          <button onClick={handleSubmit} className="bg-purple-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Suchigodown;
