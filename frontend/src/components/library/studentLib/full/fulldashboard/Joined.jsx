import React, { useState } from 'react';

const Joined = () => {
  // State to manage the form fields
  const [formData, setFormData] = useState({
    picName: '', // This will hold the image URL or file
    vedanId: '',
    name: '', // Added Name field
    seatNo: '',
    time: '',
    joiningDate: '',
    fees: '', // New field for fees
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "vedanId" || name === "name") {
      // Capitalize the first letter of Name and Vedan ID
      setFormData({
        ...formData,
        [name]: value.charAt(0).toUpperCase() + value.slice(1),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
      setFormData({
        ...formData,
        picName: imageUrl,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.vedanId) newErrors.vedanId = "Vedan ID is required";
    if (!formData.seatNo) newErrors.seatNo = "Seat No is required";
    if (!formData.fees) newErrors.fees = "Fees are required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.joiningDate) newErrors.joiningDate = "Joining Date is required";

    if (formData.fees && formData.fees <= 0) {
      newErrors.fees = "Fees should be a positive number";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert fees to a number (if it's a string)
    const formattedData = { ...formData, fees: parseFloat(formData.fees) };

    // Validate form data
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8000/api/joined', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData), // Send the formatted data (no book loans here)
        });

        if (!response.ok) {
          const errorDetails = await response.text();
          throw new Error(`Failed to submit form. Server response: ${errorDetails}`);
        }

        const result = await response.json();
        setSuccessMessage('Data successfully submitted!');
        setFormData({
          picName: '',
          vedanId: '',
          name: '',
          seatNo: '',
          time: '',
          joiningDate: '',
          fees: '',
        });
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <h3 className="text-xl font-semibold">(1)</h3>
      {/* Flex layout for image and form */}
      <div className="flex justify-between items-center mb-8">
        {/* Left Side: Image */}
        <div className="flex-none w-32 h-32 bg-gray-300 rounded-full relative">
          <label htmlFor="imageUpload" className="w-full h-full cursor-pointer">
            {formData.picName ? (
              <img
                src={formData.picName} // Display the uploaded image
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Right Side: Name and Vedan ID */}
        <div className="ml-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <label className="block text-gray-700">Vedan ID:</label>
          <input
            type="text"
            name="vedanId"
            value={formData.vedanId}
            onChange={handleFormChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.vedanId && <p className="text-red-500 text-sm">{errors.vedanId}</p>}
        </div>
      </div>

      {/* Form for Joined Information */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Seat No */}
        <div>
          <label className="block text-gray-700">Seat No:</label>
          <input
            type="text"
            name="seatNo"
            value={formData.seatNo}
            onChange={handleFormChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.seatNo && <p className="text-red-500 text-sm">{errors.seatNo}</p>}
        </div>

        {/* Fees */}
        <div>
          <label className="block text-gray-700">Fees:</label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleFormChange}
            className="w-full p-2 border rounded-md"
            min="0"
            step="any"
          />
          {errors.fees && <p className="text-red-500 text-sm">{errors.fees}</p>}
        </div>

        {/* Time */}
        <div>
          <label className="block text-gray-700">Time:</label>
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleFormChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>

        {/* Joining Date */}
        <div>
          <label className="block text-gray-700">Joining Date:</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleFormChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.joiningDate && <p className="text-red-500 text-sm">{errors.joiningDate}</p>}
        </div>

        {/* Dummy Book Loan Table */}
        <div>
          <h3 className="text-xl font-semibold">Dummy Book Loan</h3>
          <table className="table-auto w-full mt-4 border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Sr.No</th>
                <th className="border p-2">Book ID</th>
                <th className="border p-2">Book Name</th>
                <th className="border p-2">Issue Date</th>
                <th className="border p-2">Return Date</th>
                <th className="border p-2">Available</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">1</td>
                <td className="border p-2">B001</td>
                <td className="border p-2">Sample Book 1</td>
                <td className="border p-2">2025-02-01</td>
                <td className="border p-2">2025-02-28</td>
                <td className="border p-2">Yes</td>
              </tr>
              <tr>
                <td className="border p-2">2</td>
                <td className="border p-2">B002</td>
                <td className="border p-2">Sample Book 2</td>
                <td className="border p-2">2025-02-05</td>
                <td className="border p-2">2025-03-05</td>
                <td className="border p-2">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        {successMessage && (
          <p className="text-green-500 text-sm">{successMessage}</p>
        )}

        <div>
          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Joined;
