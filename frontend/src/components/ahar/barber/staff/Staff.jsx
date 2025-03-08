import React, { useState } from "react";

const Staff = () => {
  const [showForm, setShowForm] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    dob: "",
    gender: "",
    mobile: "",
    joindate:"",
    email: "",
    experience: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrainers([...trainers, formData]);
    setFormData({
      name: "",
      address: "",
      dob: "",
      gender: "",
      mobile: "",
      joindate:"",
      email: "",
      experience: "",
      description: "",
      image: null,
    });
    setShowForm(false);
  };

  const removeTrainer = (index) => {
    setTrainers(trainers.filter((_, i) => i !== index));
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
            {/* Image Upload */}
            <div>
              <label className="block font-medium">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Name"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Address"
                required
              ></textarea>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block font-medium">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-medium">Gender</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    required
                  />
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    required
                  />
                  Female
                </label>
              </div>
            </div>

            {/* Mobile */}
            <div>
              <label className="block font-medium">Mobile</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Mobile Number"
                required
              />
            </div>

             {/* Join Date */}
             <div>
              <label className="block font-medium">Joining Date </label>
              <input
                type="date"
                name="joindate"
                value={formData.joindate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Email"
                required
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block font-medium">Experience (in years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Experience"
                required
                min="0"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Description"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
<div className="w-full max-w-md">
  {trainers.length === 0 ? (
    <p className="text-gray-500 text-center">No trainers added yet.</p>
  ) : (
    trainers.map((trainer, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col gap-2"
      >
        {/* Top Row - Image & Name/Address */}
        <div className="flex items-center gap-4">
          {/* Round Image */}
          {trainer.image && (
            <img
              src={trainer.image}
              alt="Trainer"
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
          )}
          {/* Name & Address */}
          <div>
            <h3 className="text-lg font-semibold">{trainer.name}</h3>
            <p className="text-sm text-gray-600">{trainer.address}</p>
          </div>
        </div>

        {/* Below the Row - Additional Info */}
        <div className="mt-2 text-sm text-gray-600">
          {/* Join Date, DOB, Gender (Row 1) */}
          <div className="grid grid-cols-3 gap-2">
            <p><strong>Join Date:</strong> {trainer.joindate || "N/A"}</p>
            <p><strong>DOB:</strong> {trainer.dob}</p>
            <p><strong>Gender:</strong> {trainer.gender}</p>
          </div>

          {/* Contact, Email, Experience (Row 2) */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            <p><strong>Contact:</strong> {trainer.mobile}</p>
            <p><strong>Email:</strong> {trainer.email}</p>
            <p><strong>Experience:</strong> {trainer.experience} years</p>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeTrainer(index)}
          className="mt-2 text-red-600 font-bold text-sm"
        >
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
