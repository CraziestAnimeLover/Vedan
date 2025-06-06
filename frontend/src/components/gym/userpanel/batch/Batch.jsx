import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/gym/batches";

const Batch = () => {
  const [formData, setFormData] = useState({
    batchName: "",
    batchLimit: "",
    batchOpenTime: "",
    batchCloseTime: "",
  });

  const [batches, setBatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch batches from backend
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setBatches(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(API_URL, formData);
      setBatches([...batches, response.data]); // ✅ Append new batch to state
      setFormData({
        batchName: "",
        batchLimit: "",
        batchOpenTime: "",
        batchCloseTime: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding batch:", error.response?.data || error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBatches(batches.filter((batch) => batch._id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {/* Toggle Form Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        {showForm ? "Close Form" : "Add Batch"}
      </button>

      {/* Show Form When Button Clicked */}
      {showForm && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Batch Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Batch Name</label>
              <input
                type="text"
                name="batchName"
                value={formData.batchName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Batch Name"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Batch Limit</label>
              <input
                type="number"
                name="batchLimit"
                value={formData.batchLimit}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Batch Limit"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block font-medium">Batch Open Time</label>
              <input
                type="time"
                name="batchOpenTime"
                value={formData.batchOpenTime}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Batch Close Time</label>
              <input
                type="time"
                name="batchCloseTime"
                value={formData.batchCloseTime}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Batch Cards */}
      <div className="mt-6">
        {loading ? (
          <p className="text-gray-500 text-center">Loading batches...</p>
        ) : batches.length === 0 ? (
          <p className="text-gray-500 text-center">No batches added yet.</p>
        ) : (
          batches.map((batch) => (
            <div
              key={batch._id}
              className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center mb-2"
            >
              {/* Left Section (Batch Details) */}
              <div className="w-full">
                {/* Batch Name (Full Width) */}
                <h3 className="text-lg font-semibold">{batch.batchName}</h3>

                {/* Row with Available Limit & Batch Time */}
                <div className="flex justify-between mt-1 text-sm text-gray-600">
                  <p><strong>Available Limit:</strong> {batch.batchLimit}</p>
                  <p><strong>Time:</strong> {batch.batchOpenTime} - {batch.batchCloseTime}</p>
                </div>
              </div>

              {/* Delete Button (Far Right) */}
              <button
                onClick={() => handleDelete(batch._id)}
                className="text-red-600 font-bold text-lg ml-4"
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Batch;
