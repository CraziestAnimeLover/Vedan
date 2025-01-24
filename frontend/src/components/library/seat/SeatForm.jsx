import React, { useState } from "react";
import axios from "axios";

const SeatForm = ({ seatNumber, onClose }) => {
  const [formData, setFormData] = useState({
    memberId: "",
    planDetails: "",
    startDate: "",
    expiryDate: "",
    paymentMethod: "",
    paidAmount: "",
    dueAmount: "",
    nextBillDate: "",
    tableNo: "", // Add this field to track table number
  });
  
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fetch student details from the backend
  const fetchStudentDetails = async (memberId) => {
    if (!memberId) return; // Prevent unnecessary API calls
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/api/student/${memberId}`);
      setStudentDetails(response.data);
      setError("");
    } catch (err) {
      setStudentDetails(null);
      setError("Student not found");
    } finally {
      setLoading(false);
    }
  };

  // Handle member ID input blur
  const handleMemberIdBlur = () => {
    if (formData.memberId) {
      fetchStudentDetails(formData.memberId);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/book-seat", {
        ...formData,
        seatNumber,
      });
      console.log("Booking successful:", response.data);
      onClose(); // Close the form after successful submission
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form data on close
  const handleClose = () => {
    setFormData({
      memberId: "",
      planDetails: "",
      startDate: "",
      expiryDate: "",
      paymentMethod: "",
      paidAmount: "",
      dueAmount: "",
      nextBillDate: "",
    });
    setStudentDetails(null);
    setError("");
    onClose();
  };

  return (
    <div className="p-12 max-w-2xl mx-auto w-auto top-12 my-8 bg-red-300 shadow-md rounded-lg justify-center">
      <h2 className="p-12 max-w-2xl mx-auto text-xl font-bold mb-4">Seat {seatNumber} Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Member ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="memberId">Member ID</label>
          <input
            type="text"
            name="memberId"
            id="memberId"
            value={formData.memberId}
            onChange={handleChange}
            onBlur={handleMemberIdBlur}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
  <label className="block text-sm font-medium mb-2" htmlFor="tableNo">Table Number</label>
  <input
    type="text"
    name="tableNo"
    id="tableNo"
    value={formData.tableNo}
    onChange={handleChange}
    className="w-full p-2 border rounded"
    required
  />
</div>

        {/* Display Student Details */}
        {studentDetails && (
          <div className="mb-4 p-4 bg-gray-100 rounded">
            <p><strong>Name:</strong> {studentDetails.name}</p>
            <p><strong>Course:</strong> {studentDetails.course}</p>
            <p><strong>Email:</strong> {studentDetails.email}</p>
          </div>
        )}

        {/* Error message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Plan Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="planDetails">Plan Details</label>
          <input
            type="text"
            name="planDetails"
            id="planDetails"
            value={formData.planDetails}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Start and Expiry Dates */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            id="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="paymentMethod">Payment Method</label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Method</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Online">Online</option>
          </select>
        </div>

        {/* Paid and Due Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="paidAmount">Paid Amount</label>
          <input
            type="number"
            name="paidAmount"
            id="paidAmount"
            value={formData.paidAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="dueAmount">Due Amount</label>
          <input
            type="number"
            name="dueAmount"
            id="dueAmount"
            value={formData.dueAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Next Bill Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="nextBillDate">Next Bill Date</label>
          <input
            type="date"
            name="nextBillDate"
            id="nextBillDate"
            value={formData.nextBillDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeatForm;
