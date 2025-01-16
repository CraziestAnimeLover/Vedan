import React, { useState } from "react";

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
  });
  const [studentDetails, setStudentDetails] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simulate fetching student details
  const fetchStudentDetails = (memberId) => {
    // Replace with actual API call to fetch student details
    if (memberId === "12345") {
      setStudentDetails({
        name: "John Doe",
        course: "Computer Science",
        email: "johndoe@example.com",
      });
    } else {
      setStudentDetails(null);
    }
  };

  // Handle member ID input blur
  const handleMemberIdBlur = () => {
    if (formData.memberId) {
      fetchStudentDetails(formData.memberId);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose(); // Close the form after submission
  };

  return (
    <div className="p-12 max-w-2xl mx-auto w-auto top-12 my-8 bg-red-300 shadow-md rounded-lg justify-center">
      <h2 className="p-12 max-w-2xl mx-auto text-xl font-bold mb-4">Seat {seatNumber} Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Member ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Member ID</label>
          <input
            type="text"
            name="memberId"
            value={formData.memberId}
            onChange={handleChange}
            onBlur={handleMemberIdBlur}
            className="w-full p-2 border rounded"
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

        {/* Plan Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Plan Details</label>
          <input
            type="text"
            name="planDetails"
            value={formData.planDetails}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Start and Expiry Dates */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Method</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Online">Online</option>
          </select>
        </div>

        {/* Paid and Due Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Paid Amount</label>
          <input
            type="number"
            name="paidAmount"
            value={formData.paidAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Due Amount</label>
          <input
            type="number"
            name="dueAmount"
            value={formData.dueAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Next Bill Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Next Bill Date</label>
          <input
            type="date"
            name="nextBillDate"
            value={formData.nextBillDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Form Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SeatForm;
