import React, { useState } from "react";
import { FiPlus, FiTrash, FiUpload, FiEdit, FiSave } from "react-icons/fi";
import axios from "axios";
const Inventory = () => {
  const [columns, setColumns] = useState([
    { key: "Item Name", name: "Item Name", editable: false },
    { key: "quantity", name: "Quantity", editable: false },
    { key: "condition", name: "Condition", editable: false },
    { key: "remark", name: "Remark", editable: false },
    { key: "description", name: "Description (PDF)", editable: false, isFile: true },
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, "Item Name": "Dumbbell", quantity: 10, condition: "Good", remark: "No", description: null },
  ]);

  const [editingRow, setEditingRow] = useState(null);

  const handleChange = (id, field, value) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleFileUpload = (id, file) => {
    if (file && file.type === "application/pdf") {
      handleChange(id, "description", file); // Store the actual file object
    } else {
      alert("Please upload a valid PDF file.");
    }
  };
  
  
  const addRow = () => {
    const newRow = { id: inventory.length + 1 };
    columns.forEach((col) => (newRow[col.key] = col.isFile ? null : ""));
    setInventory([...inventory, newRow]);
    setEditingRow(newRow.id); // Set new row to be editable immediately
  };
  
  const deleteRow = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const addColumn = () => {
    const newColumnKey = `custom_${Date.now()}`;
    const newColumn = { key: newColumnKey, name: `New Column`, editable: true };
    setColumns([...columns, newColumn]);
    setInventory(inventory.map((item) => ({ ...item, [newColumnKey]: "" })));
  };

  const deleteColumn = (key) => {
    setColumns(columns.filter((col) => col.key !== key));
    setInventory(inventory.map((item) => {
      const { [key]: _, ...rest } = item;
      return rest;
    }));
  };
  const handleSaveAll = async () => {
    try {
      for (const item of inventory) {
        const formData = new FormData();
  
        formData.append("itemName", item["Item Name"]);
        formData.append("quantity", Number(item.quantity)); // Convert to Number
        formData.append("condition", item.condition);
        formData.append("remark", item.remark || "");
  
        if (item.description && item.description instanceof File) {
          formData.append("description", item.description);
        }
  
        const response = await axios.post("http://localhost:8000/api/gym/inventory", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        console.log("Success:", response.data);
      }
  
      alert("All items saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error.response?.data || error.message);
      alert("Failed to save some data.");
    }
  };
  
  
  

  
  return (
    <div className="p-4 max-w-5xl mx-auto">
      

      <button
        onClick={addColumn}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 flex items-center gap-2"
      >
        <FiPlus /> Add Column
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Sr. No</th>
            {columns.map((col) => (
              <th key={col.key} className="border p-2 relative">
                {col.editable ? (
                  <input
                    type="text"
                    value={col.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setColumns((prev) =>
                        prev.map((c) => (c.key === col.key ? { ...c, name: newName } : c))
                      );
                    }}
                    className="bg-transparent text-center border-none focus:outline-none w-full"
                  />
                ) : (
                  col.name
                )}
                {col.editable && (
                  <button
                    onClick={() => deleteColumn(col.key)}
                    className=" text-red-500"
                  >
                    <FiTrash />
                  </button>
                )}
              </th>
            ))}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              {columns.map((col) => (
                <td key={col.key} className="border p-2">
                  {col.isFile ? (
                    <>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileUpload(item.id, e.target.files[0])}
                        className="hidden"
                        id={`file-upload-${item.id}`}
                      />
                      <label
                        htmlFor={`file-upload-${item.id}`}
                        className="cursor-pointer text-blue-500 flex items-center justify-center gap-1"
                      >
                        <FiUpload /> Upload PDF
                      </label>
                      {item.description && (
                        <div>
                          <a
                            href={item.description}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-500 underline"
                          >
                            View PDF
                          </a>
                        </div>
                      )}
                    </>
                  ) : editingRow === item.id ? (
                    <input
                      type="text"
                      value={item[col.key] || ""}
                      onChange={(e) => handleChange(item.id, col.key, e.target.value)}
                      className="border p-1 w-full text-center"
                    />
                  ) : (
                    item[col.key] || ""
                  )}
                </td>
              ))}
              <td className="border p-2">
                {editingRow === item.id ? (
               <button
               onClick={handleSaveAll}
               className="bg-green-500 text-white px-4 py-2 rounded mt-4 flex items-center gap-2"
             >
               <FiSave /> Save All
             </button>
             
                ) : (
                  <button
                    onClick={() => setEditingRow(item.id)}
                    className="text-blue-500 mx-2"
                  >
                    <FiEdit />
                  </button>
                )}
                <button onClick={() => deleteRow(item.id)} className="text-red-500 mx-2">
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={addRow}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 flex items-center gap-2"
      >
        <FiPlus /> Add Row
      </button>
    </div>
  );
};

export default Inventory;
