import React, { useState, useEffect } from "react";
import { FiPlus, FiTrash, FiEdit, FiSave } from "react-icons/fi";
import axios from "axios";
import CategoryPopup from "../CategoryPopup";

const Suchishowroom = () => {
  const [inventory, setInventory] = useState([]);
  const [showCategoryPopup, setShowCategoryPopup] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/aharshowroom")
      .then((res) => setInventory(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const handleChange = (id, field, value) => {
    setInventory((prev) =>
      prev.map((item) => {
        if ((item.id || item._id) === id) {
          const updatedItem = { ...item, [field]: value };
  
          // Ensure total updates correctly
          if (field === "price" || field === "quantity") {
            updatedItem.total = (updatedItem.price || 0) * (updatedItem.quantity || 0);
          }
  
          return updatedItem;
        }
        return item;
      })
    );
  };
  
  const handleImageUpload = (id, file) => {
    if (file && file.type.startsWith("image/")) {
      setInventory((prev) =>
        prev.map((item) =>
          (item.id || item._id) === id ? { ...item, pic: file } : item
        )
      );
    } else {
      alert("Only image files are allowed.");
    }
  };
  
  const handlePdfUpload = (id, file) => {
    if (file && file.type === "application/pdf") {
      setInventory((prev) =>
        prev.map((item) =>
          (item.id || item._id) === id ? { ...item, description: file } : item
        )
      );
    } else {
      alert("Only PDF files are allowed.");
    }
  };
  
  const addRow = () => {
    const newItem = {
      _id: `temp-${Date.now()}`, // Ensure every row has an ID
      name: "",
      pic: null,
      category: "",
      expireDate: "",
      price: 0,
      manufacturing: "",
      quantity: 0,
      unit: "",
      total: 0,
      description: null,
    };
  
    setInventory([...inventory, newItem]);
    setEditingItemId(newItem._id);
  };
  

  const deleteRow = async (id) => {
    try {
      if (id) {
        await axios.delete(`http://localhost:8000/api/aharshowroom/${id}`);
      }
      setInventory(
        inventory.filter((item) => item.id !== id && item._id !== id)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      for (const item of inventory) {
        const formData = new FormData();
        Object.entries(item).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });
  
        // Debugging: Print FormData fields
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
  
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
      alert(
        "Error submitting data: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  

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
      alert(
        "Error updating item: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <button
        onClick={addRow}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center gap-2"
      >
        <FiPlus /> Add Row
      </button>

      <table className="w-full border-collapse border border-gray-300">
      <thead>
  <tr className="bg-gray-200">
    <th className="border p-2">Sr. No</th>
    <th className="border p-2">Image</th>
    <th className="border p-2">Name</th>
    <th className="border p-2">Category</th>
    <th className="border p-2">Expire Date</th>
    <th className="border p-2">Price</th>
    <th className="border p-2" colSpan={2}>Quantity</th>
    <th className="border p-2">Total</th>
    <th className="border p-2">Description</th>
    <th className="border p-2">Actions</th>
  </tr>
  <tr className="bg-gray-200">
    <th className="border p-2" colSpan={6}></th>
    <th className="border p-2">Unit</th>
    <th className="border p-2">Kg/L</th>
    <th className="border p-2" colSpan={3}></th>
  </tr>
</thead>

        <tbody>
          {inventory.map((item, index) => (
            <tr key={item._id} className="text-center relative">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(item._id, e.target.files[0])
                  }
                  disabled={editingItemId !== item._id}
                />
                {item.pic && (
                  <img
                    src={
                      typeof item.pic === "string"
                        ? item.pic
                        : URL.createObjectURL(item.pic)
                    }
                    alt="Preview"
                    className="h-10 w-10 object-cover mt-1"
                  />
                )}
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleChange(item._id, "name", e.target.value)
                  }
                  className="border rounded p-1"
                  disabled={editingItemId !== item._id}
                />
              </td>
              <td className="border p-2">
                <button
                  className="text-blue-500 underline"
                  onClick={() => setShowCategoryPopup(item._id)}
                >
                  {item.category || "Select Category"}
                </button>
                {showCategoryPopup === item._id && (
               <CategoryPopup
               onSelect={(category) => {
                 handleChange(item._id, "category", category);
                 setShowCategoryPopup(null); // Close popup after selection
               }}
               onClose={() => setShowCategoryPopup(null)}
             />
             
                )}
              </td>
              <td className="border p-2">
                <input
                  type="date"
                  value={item.expireDate}
                  onChange={(e) =>
                    handleChange(item._id, "expireDate", e.target.value)
                  }
                  disabled={editingItemId !== item._id}
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    handleChange(item._id, "price", Number(e.target.value))
                  }
                  disabled={editingItemId !== item._id}
                />
              </td>
              <td className="border p-2 flex">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(item._id, "quantity", Number(e.target.value))
                  }
                  disabled={editingItemId !== item._id}
                  className="w-16 border rounded p-1"
                />
                <input
                  type="text"
                  value={item.unit}
                  onChange={(e) =>
                    handleChange(item._id, "unit", e.target.value)
                  }
                  disabled={editingItemId !== item._id}
                  className="w-16 border rounded p-1 ml-2"
                  placeholder="Unit (e.g., KG, L, PCS)"
                />
              </td>

              <td className="border p-2">{item.total}</td>

              <td className="border p-2">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handlePdfUpload(item._id, e.target.files[0])}
                  disabled={editingItemId !== item._id}
                />
                {item.description && (
                  <div className="mt-2">
                    <a
                      href={URL.createObjectURL(item.description)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View PDF
                    </a>
                    <button
                      onClick={() =>
                        handleChange(item._id, "description", null)
                      }
                      className="ml-2 text-red-500"
                      disabled={editingItemId !== item._id}
                    >
                      <FiTrash />
                    </button>
                  </div>
                )}
              </td>
              <td className="border p-2 flex justify-center gap-2">
                {editingItemId === item._id ? (
                  <button
                    onClick={() => handleUpdate(item._id)}
                    className="text-green-500"
                  >
                    <FiSave />
                  </button>
                ) : (
                  <button
                    onClick={() => setEditingItemId(item._id)}
                    className="text-blue-500"
                  >
                    <FiEdit />
                  </button>
                )}
                <button
                  onClick={() => deleteRow(item._id)}
                  className="text-red-500"
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Suchishowroom;
