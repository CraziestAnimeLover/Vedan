import React, { useState } from "react";

const Notice = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    notice: "",
    startDate: "",
    endDate: "",
    visibleTo: "User",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Create Notice</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Notice</label>
          <textarea
            name="notice"
            value={formData.notice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Enter notice details..."
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Visible To</label>
          <select
            name="visibleTo"
            value={formData.visibleTo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="User">User</option>
            <option value="Member">Member</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Notice;
