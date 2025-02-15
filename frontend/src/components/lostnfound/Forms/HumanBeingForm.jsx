import { useState, useEffect } from "react";

const HumanBeingForm = () => {
  const [formData, setFormData] = useState({
    lostLocation: "",
    lostDate: "",
    lostTime: "",
    skinColor: "",
    eyeColor: "",
    hairColor: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    name: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    guardianAddress: "",
    image: null,
  });

  // Fetch existing data
  useEffect(() => {
    fetch("http://localhost:8000/api/humans")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData((prev) => ({ ...prev, ...data }));
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let isValid = true;
  
    // Define regex patterns
    const patterns = {
      lostLocation: /^[A-Za-z\s]+$/,
      name: /^[A-Za-z\s]+$/,
      hairColor: /^[A-Za-z\s]+$/,
      guardianName: /^[A-Za-z\s]+$/,
      height: /^\d+(\.\d+)?$/,
      weight: /^\d+(\.\d+)?$/,
      age: /^\d+$/,
      guardianPhone: /^\d{10,15}$/,
    };
  
    // Apply validation
    if (patterns[name]) {
      isValid = patterns[name].test(value);
    }
  
    if (isValid || value === "") {
      setFormData({ ...formData, [name]: value });
    } else {
      console.warn(`Invalid input for ${name}`);
    }
  
    if (type === "file") {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };
  

  // Handle form submission
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
      console.error("No valid file selected.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/humans", {
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
          skinColor: "",
          eyeColor: "",
          hairColor: "",
          height: "",
          weight: "",
          age: "",
          gender: "",
          name: "",
          address: "",
          guardianName: "",
          guardianPhone: "",
          guardianAddress: "",
          image: null,
        });
        
        // ✅ Reset file input (needed because React state alone won't clear it)
        document.getElementById("imageInput").value = "";
        
      } else {
        alert(result.message || "Error submitting form.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  
  
  
  
  
  
  
  
  
  
   

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h3 className="text-white font-semibold">(1) Exact Samay</h3>
        <label className="text-gray-400">Lost Location</label>
        <input
          type="text"
          name="lostLocation"
          value={formData.lostLocation}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
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

<div className="mb-4">
  <h3 className="text-white font-semibold">(3) Biometric Details</h3>
  <label className="text-gray-400">skin Color</label>
  <input
    type="text"
    name="skinColor"
    value={formData.skinColor}
    onChange={handleChange}
    className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
  />
  <label className="text-gray-400 mt-2">Eye Color</label>
  <input
    type="text"
    name="eyeColor"
    value={formData.eyeColor}
    onChange={handleChange}
    className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
  />
  <label className="text-gray-400 mt-2">Hair Color</label>
  <input
    type="text"
    name="hairColor"
    value={formData.hairColor}
    onChange={handleChange}
    className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
  />
  <label className="text-gray-400 mt-2">Height</label>
  <input
    type="text"
    name="height"
    value={formData.height}
    onChange={handleChange}
    className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
  />
  <label className="text-gray-400 mt-2">Weight</label>
  <input
    type="text"
    name="weight"
    value={formData.weight}
    onChange={handleChange}
    className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
  />
  <label className="text-gray-400 mt-2">Age</label>
  <input
    type="text"
    name="age"
    value={formData.age}
    onChange={handleChange}
    className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
  />
  <label className="text-gray-400 mt-2">Gender</label>
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>


      <div className="mb-4">
        <h3 className="text-white font-semibold">(4) Social Details</h3>
        <label className="text-gray-400">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
        <label className="text-gray-400 mt-2">Upload Picture</label>
        <input
  type="file"
  name="image" // ⚠️ Must match multer field
  accept="image/*"
  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
        <label className="text-gray-400 mt-2">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          
        />
      </div>

      <div className="mb-4">
        <h3 className="text-white font-semibold">(5) Guardian Details</h3>
        <label className="text-gray-400">Guardian Name</label>
        <input
          type="text"
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
        <label className="text-gray-400 mt-2">Phone Number</label>
        <input
          type="tel"
          name="guardianPhone"
          value={formData.guardianPhone}
          onChange={handleChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        />
        <label className="text-gray-400 mt-2">Gardian Address</label>
        <textarea
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter guardian's address"
          aria-label="Guardian Address"
          name="guardianAddress"
          value={formData.guardianAddress}
          onChange={handleChange}
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

export default HumanBeingForm;
