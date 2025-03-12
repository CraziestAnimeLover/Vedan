import React, { useState, useEffect } from "react";
import axios from "axios";

const AharNotice = () => {
  const [showForm, setShowForm] = useState(false);
  const [notices, setNotices] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    notice: "",
    startDate: "",
    endDate: "",
    visibleTo: "User",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch notices on component mount
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/notices");
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices:", error);
        setErrorMessage("Failed to load notices.");
      }
      setLoading(false);
    };

    fetchNotices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setErrorMessage("End date must be later than the start date.");
      return;
    }

    setLoading(true);
    try {
      if (editIndex !== null) {
        await axios.put(
          `http://localhost:8000/api/notices/${notices[editIndex]._id}`,
          formData
        );
        const updatedNotices = [...notices];
        updatedNotices[editIndex] = formData;
        setNotices(updatedNotices);
        setEditIndex(null);
      } else {
        const response = await axios.post("http://localhost:8000/api/notices", formData);
        setNotices([...notices, response.data]);
      }

      // Reset form and close it
      setFormData({ notice: "", startDate: "", endDate: "", visibleTo: "User" });
      setShowForm(false);
      setErrorMessage(""); // Reset error message after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Failed to submit notice.");
    }
    setLoading(false);
  };

  const removeNotice = async (index) => {
    try {
      await axios.delete(`http://localhost:8000/api/notices/${notices[index]._id}`);
      setNotices(notices.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting notice:", error);
      setErrorMessage("Failed to delete notice.");
    }
  };

  const editNotice = (index) => {
    setFormData(notices[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className="p-4 flex flex-col items-center w-full relative">
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditIndex(null); // Reset edit index when opening form
        }}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded shadow-md"
      >
        {showForm ? "Show Notices" : "Add Notice"}
      </button>

      <h2 className="text-lg font-semibold mb-4">Notice Board</h2>

      {errorMessage && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}

      {showForm ? (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">{editIndex !== null ? "Edit Notice" : "Create Notice"}</h2>
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
                <option value="Staff">Staff</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Submitting..." : editIndex !== null ? "Update Notice" : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {loading ? (
            <p className="text-center">Loading notices...</p>
          ) : notices.length === 0 ? (
            <p className="text-gray-500 text-center">No notices added yet.</p>
          ) : (
            notices.map((notice, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{notice.notice}</h3>
                  <p className="text-sm text-gray-600">
                    <strong>Start:</strong> {notice.startDate || "--"} | <strong>End:</strong>{" "}
                    {notice.endDate || "--"}
                  </p>
                </div>
                <div className="flex gap-2">
                  {/* Edit Button */}
                  <button
                    onClick={() => editNotice(index)}
                    className="text-blue-600 font-bold text-lg"
                  >
                    ✏️
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => removeNotice(index)}
                    className="text-red-600 font-bold text-lg"
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AharNotice;
