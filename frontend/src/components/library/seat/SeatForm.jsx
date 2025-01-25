import React, { useState } from "react";
import axios from "axios";

const SeatForm = ({ seatNumber }) => {
  const [formData, setFormData] = useState({
    memberId: "",
    planDetails: "",
    startDate: "",
    expiryDate: "",
    paymentMethod: "",
    paidAmount: "",
    dueAmount: "",
    nextBillDate: "",
    tableNo: "",
  });

  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null); // Store the submitted data

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
        seatNumber, // The selected seat number is passed along with the other form data
      });

      if (response.data.success) {
        // Successful booking, set the submitted data to display it
        setSubmittedData({
          ...formData,
          seatNumber,
          studentDetails, // Include student details in the data
        });
        alert("Seat booked successfully!");
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render the form or submitted details
  if (submittedData) {
    return (
      <div className="p-12 max-w-2xl mx-auto w-auto top-12 my-8 bg-gray-300 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Seat Details</h2>
        <div className="space-y-4">
          <p><strong>Seat Number:</strong> {submittedData.seatNumber}</p>
          <p><strong>Member ID:</strong> {submittedData.memberId}</p>
          <p><strong>Table Number:</strong> {submittedData.tableNo}</p>
          <p><strong>Plan Details:</strong> {submittedData.planDetails}</p>
          <p><strong>Start Date:</strong> {submittedData.startDate}</p>
          <p><strong>Expiry Date:</strong> {submittedData.expiryDate}</p>
          <p><strong>Payment Method:</strong> {submittedData.paymentMethod}</p>
          <p><strong>Paid Amount:</strong> {submittedData.paidAmount}</p>
          <p><strong>Due Amount:</strong> {submittedData.dueAmount}</p>
          <p><strong>Next Bill Date:</strong> {submittedData.nextBillDate}</p>

          {/* Display Student Details */}
          {submittedData.studentDetails && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p><strong>Name:</strong> {submittedData.studentDetails.name}</p>
              <p><strong>Course:</strong> {submittedData.studentDetails.course}</p>
              <p><strong>Email:</strong> {submittedData.studentDetails.email}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-12 max-w-2xl mx-auto w-auto top-12 my-8 bg-red-300 shadow-md rounded-lg justify-center">
      <h2 className="text-xl font-bold mb-4">Seat {seatNumber} Form</h2>
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
            onClick={() => setSubmittedData(null)} // Clear the submitted data to show form again
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
