import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiPlus, FiTrash } from "react-icons/fi";
import CategoryPopup from "../CategoryPopup"; // Import the CategoryPopup component

const API_URL = "http://localhost:8000/api/suchigodown"; // Update this with your actual backend URL

const Suchigodown = () => {
  const [inventory, setInventory] = useState([]);
  const [showCategoryPopup, setShowCategoryPopup] = useState(null);
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await axios.get(API_URL);
      setInventory(response.data.map((item) => ({ ...item, id: item._id }))); // Map _id to id
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };
  

  const handleChange = (id, field, value) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              total:
                field === "price" || field === "quantity"
                  ? Number(value) * Number(item.quantity || 1) // Prevents multiplying by undefined
                  : Number(item.price || 1) * Number(item.quantity || 1),
            }
          : item
      )
    );
  };
  

  const handleFileUpload = (id, field, file) => {
    const formData = new FormData();
    formData.append(field, file); // Add the file to the form data
  
    axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(response => {
      console.log("File uploaded successfully", response);
    }).catch(error => {
      console.error("Error uploading file", error);
    });
  };
  

  const addRow = () => {
    setInventory([
      ...inventory,
      {
        id: Date.now(),
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
      },
    ]);
  };

  const deleteRow = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setInventory(inventory.filter((item) => item.id !== id)); // Now matches backend `_id`
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  

  const handleCategorySelect = (id, category) => {
    handleChange(id, "category", category);
    setShowCategoryPopup(null);
  };
  const handleSubmit = async () => {
    for (const item of inventory) {
      if (!item.name || !item.category || !item.quantity || !item.price || !item.unit) {
        alert("Please fill all required fields before submitting.");
        return;
      }
    }
  
    try {
      for (const item of inventory) {
        const { id, ...data } = item; // Remove frontend-only ID before sending
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("pic", data.pic); // Assuming pic is a file
        formData.append("category", data.category);
        formData.append("expireDate", data.expireDate);
        formData.append("price", data.price);
        formData.append("manufacturing", data.manufacturing);
        formData.append("quantity", data.quantity);
        formData.append("unit", data.unit);
        formData.append("total", data.total);
        formData.append("description", data.description); // Assuming description is a file
  
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      alert("Inventory submitted successfully!");
      fetchInventory(); // Refresh data after submission
    } catch (error) {
      console.error("Error submitting inventory:", error.response?.data || error.message);
    }
  };
  
  
  
  

  const handleUpdate = async (id) => {
    setEditMode(id);
    const item = inventory.find((item) => item.id === id);
    try {
      await axios.put(`${API_URL}/${id}`, item);
      alert("Inventory updated successfully!");
      setEditMode(null);
      fetchInventory();
    } catch (error) {
      console.error("Error updating inventory:", error);
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
          <tr className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wide">
            <th className="border p-3 bg-gray-300">Sr. No</th>
            <th className="border p-3 bg-gray-300">Name</th>
            <th className="border p-3 bg-gray-300">Pic</th>
            <th className="border p-3 bg-gray-300">Category</th>
            <th className="border p-3 bg-gray-300">Expire Date</th>
            <th className="border p-3 bg-gray-300">Price</th>
            <th className="border p-3 bg-gray-300">Manufacturing</th>
            <th className="border p-3 bg-gray-300" colSpan="2">Quantity</th>
            <th className="border p-3 bg-gray-300">Total</th>
            <th className="border p-3 bg-gray-300">Description</th>
            <th className="border p-3 bg-gray-300">Actions</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(item.id, "name", e.target.value)}
                  className="border rounded p-1 w-full"
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
                <input type="number" value={item.price} onChange={(e) => handleChange(item.id, "price", Number(e.target.value))} className="border rounded p-1 w-20" />
              </td>
              <td className="border p-2">
                <input type="text" value={item.manufacturing} onChange={(e) => handleChange(item.id, "manufacturing", e.target.value)} className="border rounded p-1 w-full" />
              </td>
              <td className="border p-2">
                <input type="number" value={item.quantity} onChange={(e) => handleChange(item.id, "quantity", Number(e.target.value))} className="border rounded p-1 w-16" />
              </td>
              <td className="border p-2">
                <input type="text" value={item.unit} onChange={(e) => handleChange(item.id, "unit", e.target.value)} className="border rounded p-1 w-16" />
              </td>
              <td className="border p-2">{item.total}</td>
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
