import React, { useState } from 'react';
import ProfileCard from './ProfileCard'; // Import the ProfileCard component

const LibraryProfile = () => {
  const profile = {
    profilePicture: 'https://randomuser.me/api/portraits/men/21.jpg', // Use a real URL for an image
    fullName: 'John Doe',
    vedannId: 'VD123456',
    address: '123 Main Street',
  };

  // State to control the active form
  const [activeForm, setActiveForm] = useState('');

  // State to hold form data
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    social: "",
    address: profile.address || "",
    GST: "",
    PAN: "",
    OTHERID: "",
    Name: "",
    VedanId: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleForm = (formType) => {
    setActiveForm(formType); // Set the active form
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-[#20354b] px-4 py-6 shadow-lg flex flex-col justify-between">
        <div>
          {/* ProfileCard placed at the top */}
          <ProfileCard profile={profile} />
        </div>

        {/* Sidebar Navigation */}
        <div
          className="text-white cursor-pointer hover:text-yellow-500 mb-4"
          onClick={() => handleToggleForm('contact')}
        >
          Contact
        </div>
        <div
          className="text-white cursor-pointer hover:text-yellow-500 mb-4"
          onClick={() => handleToggleForm('verification')}
        >
          Verification
        </div>
        <div
          className="text-white cursor-pointer hover:text-yellow-500 mb-4"
          onClick={() => handleToggleForm('founder')}
        >
          Founder
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="flex-1 bg-[#071e34] p-6 flex justify-start items-start">
        {/* Default Message when no form is selected */}
        {activeForm === '' && (
          <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
            <h2 className="text-white font-semibold text-lg mb-4">Welcome to Your Library Profile</h2>
            <p className="text-gray-300">
              It seems like you haven't selected a form yet. Please choose one from the menu to get started.
            </p>
            <p className="text-gray-400 mt-4">Your journey begins here. We are happy to assist you!</p>
          </div>
        )}

        {/* Conditional rendering based on activeForm state */}
        {activeForm === 'contact' && (
          <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-white font-semibold text-lg">Edit Contact Details</h3>
            <form className="mt-4">
              {/* Mobile */}
              <div className="mb-4">
                <label className="text-gray-400">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleFormChange}
                  className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                  placeholder="Enter mobile number"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                  placeholder="Enter email"
                />
              </div>

              {/* Social Media */}
              <div className="mb-4">
                <label className="text-gray-400">Social</label>
                <input
                  type="text"
                  name="social"
                  value={formData.social}
                  onChange={handleFormChange}
                  className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                  placeholder="Enter social media link"
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="text-gray-400">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                  placeholder="Enter address"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeForm === 'verification' && (
          <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-white font-semibold text-lg">Edit Verification Details</h3>
            <form className="mt-4">
              {/* GST */}
              <div className="mb-4">
                <label className="text-gray-400">GST</label>
                <input
                  type="text"
                  name="GST"
                  value={formData.GST}
                  onChange={handleFormChange}
                  className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                  placeholder="Enter GST number"
                />
              </div>

              {/* PAN */}
              <div className="mb-4">
                <label className="text-gray-400">PAN</label>
                <input
                  type="text"
                  name="PAN"
                  value={formData.PAN}
                  onChange={handleFormChange}
                  className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                  placeholder="Enter PAN number"
                />
              </div>

              {/* Other ID */}
              <div className="mb-4">
                <label className="text-gray-400">Other ID</label>
                <input
                  type="text"
                  name="OTHERID"
                  value={formData.OTHERID}
                  onChange={handleFormChange}
                  className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                  placeholder="Enter other ID"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeForm === 'founder' && (
          <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-white font-semibold text-lg">Edit Founder Details</h3>
            <form className="mt-4">
              {/* Name */}
              <div className="mb-4">
                <label className="text-gray-400">Name</label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleFormChange}
                  className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                  placeholder="Enter name"
                />
              </div>

              {/* Vedan ID */}
              <div className="mb-4">
                <label className="text-gray-400">Vedan ID</label>
                <input
                  type="text"
                  name="VedanId"
                  value={formData.VedanId}
                  onChange={handleFormChange}
                  className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                  placeholder="Enter Vedan ID"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-md"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryProfile;
