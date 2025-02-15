import { useState } from "react";


const MaterialForm = () => {
  const [formData, setFormData] = useState({
    lostLocation: "",
    lostDate: "",
    lostTime: "",
    height: "",
    length: "",
    width: "",
    weight: "",
    diameter: "",
    materialType: "",
    image: null,
    brandName: "",
    taxNumber: "",
    contactPerson: "",
    phoneNumber: "",
    address: "",
  });

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    
    const formDataObj = new FormData();

    // ✅ Append all text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image") {
        formDataObj.append(key, value);
      }
    });

    // ✅ Append file (must be a File object)
    if (formData.image instanceof File) {
      formDataObj.append("image", formData.image);
    } else {
      alert("Please select a valid file before submitting.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/materials", {
        method: "POST",
        body: formDataObj, // ✅ No `Content-Type` header needed
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert("Form submitted successfully!");

        // ✅ Clear form after successful submission
        setFormData({
          lostLocation: "",
          lostDate: "",
          lostTime: "",
          height: "",
          length: "",
          width: "",
          weight: "",
          diameter: "",
          materialType: "",
          image: null,
          brandName: "",
          taxNumber: "",
          contactPerson: "",
          phoneNumber: "",
          address: "",
        });

        // ✅ Reset file input manually
        document.getElementById("imageInput").value = "";
      } else {
        alert(result.message || "Error submitting form.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    }
  };
  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      {/* Exact Samay */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(1) Exact Samay</h3>
        <label className="text-gray-400">Lost Location</label>
        <input
          type="text"
          name="lostLocation"
          value={formData.lostLocation}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter lost location"
        />
        <label className="text-gray-400 mt-2">Lost Date</label>
        <input
          type="date"
          name="lostDate"
          value={formData.lostDate}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
        <label className="text-gray-400 mt-2">Lost Time</label>
        <input
          type="time"
          name="lostTime"
          value={formData.lostTime}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
      </div>

      {/* Measurement */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(2) Measurement</h3>
        {[
          "height",
          "length",
          "width",
          "weight",
          "diameter",
        ].map((field) => (
          <div key={field}>
            <label className="text-gray-400 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}
      </div>

      {/* Social Info */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(3) Social Details</h3>
        <label className="text-gray-400">Material Type</label>
        <input
          type="text"
          name="materialType"
          value={formData.materialType}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter material type"
        />
        <label className="text-gray-400 mt-2">Upload Picture</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
        <label className="text-gray-400 mt-2">Brand Name</label>
        <input
          type="text"
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter brand name"
        />
        <label className="text-gray-400 mt-2">Tax Number</label>
        <input
          type="text"
          name="taxNumber"
          value={formData.taxNumber}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter tax number"
        />
      </div>

      {/* Contact Details */}
      <div className="mb-4">
        <h3 className="text-white font-semibold">(4) Contact Details</h3>
        <label className="text-gray-400">Contact Person</label>
        <input
          type="text"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter contact person's name"
        />
        <label className="text-gray-400 mt-2">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter phone number"
        />
        <label className="text-gray-400 mt-2">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter address"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition duration-300"
      >
        Submit Details
      </button>
    </form>
  );
};

export default MaterialForm;
