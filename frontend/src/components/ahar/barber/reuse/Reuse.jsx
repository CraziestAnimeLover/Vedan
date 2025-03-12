import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import CategoryPopup from "../Suchi/CategoryPopup"; // Import the CategoryPopup component

const Reuse = () => {
  const [inventory, setInventory] = useState([]);
  const [showCategoryPopup, setShowCategoryPopup] = useState(null);
  const [editMode, setEditMode] = useState(null);

  const handleChange = (id, field, value) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [field]: value, total: item.price * (item.quantityNumber + item.quantityKgL) }
          : item
      )
    );
  };

  const handleFileUpload = (id, field, file) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: file, total: item.price * (item.quantityNumber + item.quantityKgL) } : item
      )
    );
  };
  
  const addRow = () => {
    setInventory([...inventory, { id: Date.now(), name: "", pic: null, category: "", expireDate: "", price: "", manufacturing: "", quantityNumber: 0, quantityKgL: 0, offer: 0, total: 0, description: null }]);
  };

  const deleteRow = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleCategorySelect = (id, category) => {
    handleChange(id, "category", category);
    setShowCategoryPopup(null);
  };

  const handleSubmit = async () => {
    // Validate inventory data
    const validateInventory = () => {
      return inventory.every(
        (item) =>
          item.name &&
          item.category &&
          item.expireDate &&
          item.price &&
          item.quantityNumber >= 0 &&
          item.quantityKgL >= 0
      );
    };
  
    if (!validateInventory()) {
      alert("Please fill in all required fields for each item.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      inventory.forEach((item, index) => {
        formData.append(`inventory[${index}][name]`, item.name);
        formData.append(`inventory[${index}][category]`, item.category);
        formData.append(`inventory[${index}][expireDate]`, item.expireDate);
        formData.append(`inventory[${index}][price]`, item.price);
        formData.append(`inventory[${index}][manufacturing]`, item.manufacturing);
        formData.append(`inventory[${index}][quantityNumber]`, item.quantityNumber);
        formData.append(`inventory[${index}][quantityKgL]`, item.quantityKgL);
        formData.append(`inventory[${index}][offer]`, item.offer);
        formData.append(`inventory[${index}][description]`, item.description);
  
        if (item.pic) {
          formData.append(`inventory[${index}][pic]`, item.pic); // Append pic for each item
        }
  
        if (item.descriptionFile) {
          formData.append(`inventory[${index}][description]`, item.descriptionFile); // Append description file
        }
      });
  
      const response = await fetch("http://localhost:8000/api/reuse", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error Response:", errorResponse);
        throw new Error("Inventory submission failed.");
      }
  
      const result = await response.json();
      alert(result.message || "Inventory submitted successfully!");
    } catch (error) {
      console.error("Error submitting inventory:", error);
      alert("Failed to submit inventory.");
    }
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
            <th className="border p-2">Name</th>
            <th className="border p-2">Pic</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Expire Date</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Manufacturing</th>
            <th className="border p-2" colSpan="2">Quantity</th>
            <th className="border p-2">Offer (%)</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
          <tr className="bg-gray-200">
            <th colSpan="7"></th>
            <th className="border p-2">Number</th>
            <th className="border p-2">Kg/L</th>
            <th colSpan="4"></th>
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
                <input type="file" accept="image" onChange={(e) => handleFileUpload(item.id, "pic", e.target.files[0])} />
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
                <input type="number" value={item.quantityNumber} onChange={(e) => handleChange(item.id, "quantityNumber", Number(e.target.value))} />
              </td>
              <td className="border p-2">
                <input type="number" value={item.quantityKgL} onChange={(e) => handleChange(item.id, "quantityKgL", Number(e.target.value))} />
              </td>
              <td className="border p-2">
                <input type="number" value={item.offer} onChange={(e) => handleChange(item.id, "offer", Number(e.target.value))} />
              </td>
              <td className="border p-2">{item.price * (item.quantityNumber + item.quantityKgL)}</td>
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

export default Reuse;
