import React, { useState, useEffect } from "react";
import axios from "axios";
import AddedItemsTable from "./AddedItemsTable"; 

const API_BASE_URL = "http://localhost:8000/api/demandinventory"; // Adjust based on your backend URL

const Dainik = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    id: "",
    items: [],
  });

  const [item, setItem] = useState({
    category: "",
    company: "",
    quantity: "",
    price: "",
    remark: "",
  });

  const [inventory, setInventory] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(`${API_BASE_URL}?page=${page}&search=${search}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInventory(response.data.items);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Failed to fetch inventory data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [page, search]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (!item.category || !item.company || !item.quantity || !item.price) {
      alert("Please fill all required item fields.");
      return;
    }

    setFormData((prev) => ({ ...prev, items: [...prev.items, item] }));
    setItem({ category: "", company: "", quantity: "", price: "", remark: "" });
    setShowTable(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_BASE_URL, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Response after submission:", response.data);
  
      alert("Inventory added successfully!");
      setSubmittedData(response.data); // Ensure setting data from response
      setFormData({ date: "", time: "", name: "", id: "", items: [] });
      setShowTable(false);
      fetchInventory(); // Refresh inventory after adding a new item
    } catch (error) {
      alert("Error submitting inventory. Please check your connection.");
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Daily Inventory Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Information */}
        <div className="grid grid-cols-2 gap-4">
          <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="p-2 border rounded" />
          <input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="p-2 border rounded" />
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required className="p-2 border rounded" />
          <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleInputChange} required className="p-2 border rounded" />
        </div>

        {/* Items Table */}
        <h3 className="text-lg font-semibold mb-2">Add Items</h3>
        <div className="grid grid-cols-5 gap-2">
          <input type="text" name="category" placeholder="Category" value={item.category} onChange={handleItemChange} required className="p-2 border rounded" />
          <input type="text" name="company" placeholder="Company" value={item.company} onChange={handleItemChange} required className="p-2 border rounded" />
          <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} onChange={handleItemChange} min="1" required className="p-2 border rounded" />
          <input type="number" name="price" placeholder="Price" value={item.price} onChange={handleItemChange} min="1" required className="p-2 border rounded" />
          <input type="text" name="remark" placeholder="Remark (optional)" value={item.remark} onChange={handleItemChange} className="p-2 border rounded" />
        </div>

        <button type="button" onClick={addItem} className="bg-blue-500 text-white p-2 rounded mt-2">
          Add Item
        </button>

        {showTable && <AddedItemsTable items={formData.items} />}

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg mt-4">
          Submit
        </button>
      </form>

      {/* Search and Pagination */}
      <div className="mt-6 flex justify-between">
        <input
          type="text"
          placeholder="Search Inventory"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="p-2 mx-1 border rounded bg-gray-300">
            Prev
          </button>
          <span> Page {page} of {totalPages} </span>
          <button onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))} disabled={page >= totalPages} className="p-2 mx-1 border rounded bg-gray-300">
            Next
          </button>
        </div>
      </div>

      {/* Display Inventory */}
      {loading ? <p>Loading inventory...</p> : error ? <p className="text-red-500">{error}</p> : <AddedItemsTable items={inventory} />}

      {/* Show Submitted Data */}
      {submittedData && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Submitted Details</h3>
          <p><strong>Date:</strong> {submittedData.date}</p>
          <p><strong>Time:</strong> {submittedData.time}</p>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>ID:</strong> {submittedData.id}</p>
          <AddedItemsTable items={submittedData.items} />
        </div>
      )}
    </div>
  );
};

export default Dainik;
