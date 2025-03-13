import React, { useState, useEffect } from "react";

const Staff = () => {
  const [showForm, setShowForm] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dob: "",
    gender: "",
    mobile: "",
    joindate: "",
    email: "",
    experience: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    // Fetch existing staff data on mount
    const fetchTrainers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ahar/staff");
        if (!response.ok) throw new Error("Failed to fetch trainers");
        const data = await response.json();
        setTrainers(data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreviewImage(URL.createObjectURL(file)); // Set preview image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("dob", formData.dob);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("joindate", formData.joindate);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("description", formData.description);
  
    if (formData.image instanceof File) {
      formDataToSend.append("image", formData.image);
    } else {
      console.error("No image file selected");
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/ahar/staff", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (!response.ok) {
        throw new Error("Failed to add staff");
      }
  
      const newStaff = await response.json();
      setTrainers([...trainers, newStaff]);
  
      setFormData({
        name: "",
        address: "",
        dob: "",
        gender: "",
        mobile: "",
        joindate: "",
        email: "",
        experience: "",
        description: "",
        image: null,
      });
  
      setShowForm(false);
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };
  

  const removeTrainer = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/ahar/staff/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete trainer");

      setTrainers(trainers.filter((trainer) => trainer._id !== id));
    } catch (error) {
      console.error("Error deleting trainer:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center w-full relative">
      {/* Toggle Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded shadow-md"
      >
        {showForm ? "Show Staff" : "Add Staff"}
      </button>

      <h2 className="text-lg font-semibold mb-4">Staff Management</h2>

      {showForm ? (
        <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Add Staff</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Profile Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
            </div>
            {previewImage && <img src={previewImage} alt="Preview" className="w-24 h-24 rounded-full mt-2" />}

            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter Name" required />
            <textarea name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter Address" required />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border rounded" required />
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} required />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} required />
                Female
              </label>
            </div>
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter Mobile Number" required />
            <input type="date" name="joindate" value={formData.joindate} onChange={handleChange} className="w-full p-2 border rounded" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter Email" required />
            <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter Experience" required min="0" />
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Enter Description" required />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md">
          {trainers.length === 0 ? (
            <p className="text-gray-500 text-center">No trainers added yet.</p>
          ) : (
            trainers.map((trainer) => (
              <div key={trainer._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4">
                <img src={trainer.image ? `http://localhost:8000/${trainer.image}` : "fallback-image.jpg"} alt="Staff" />



                  <div>
                    <h3 className="text-lg font-semibold">{trainer.name}</h3>
                    <p className="text-sm text-gray-600">{trainer.address}</p>
                  </div>
                </div>
                <button onClick={() => removeTrainer(trainer._id)} className="mt-2 text-red-600 font-bold text-sm">
                  Remove Staff
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Staff;
