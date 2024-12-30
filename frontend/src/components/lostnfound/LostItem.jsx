import React, { useState } from 'react';
import Navbar from '../shared/Navbar';

const LostItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    contactInfo: '',
  });

  const [image, setImage] = useState(null); // For image upload preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lost Item Details:', { ...formData, image });
    alert('Lost item details submitted!');
    setFormData({ name: '', description: '', location: '', contactInfo: '' });
    setImage(null);
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Lost Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Item Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter item name"
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the item"
            rows="3"
            required
          />
        </div>

        {/* Location Field */}
        <div>
          <label htmlFor="location" className="block text-gray-700 font-medium">
            Last Seen Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location"
            required
          />
        </div>

        {/* Contact Info Field */}
        <div>
          <label htmlFor="contactInfo" className="block text-gray-700 font-medium">
            Contact Information
          </label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your contact info"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-gray-700 font-medium">
            Upload Picture
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-gray-700 p-2 border rounded focus:outline-none"
          />
          {image && (
            <div className="mt-4">
              <p className="text-gray-600 font-medium">Preview:</p>
              <img
                src={image}
                alt="Preview"
                className="w-full h-40 object-cover rounded border mt-2"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default LostItem;
