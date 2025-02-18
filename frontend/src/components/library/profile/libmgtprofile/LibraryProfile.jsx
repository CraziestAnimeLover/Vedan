import React, { useState, useEffect, useRef } from "react";
import ProfileCard from "./ProfileCard"; // Import the ProfileCard component
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const LibraryProfile = () => {
  const fileInputRef = useRef(null); // Create a ref for the file input
  const { user, loading } = useSelector((store) => store.auth);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    social: [], // Initialize as an empty array
    address: user?.profile?.address || "",
    GST: "",
    PAN: "",
    OTHERID: "",
    Name: "",
    VedanId: "",
    BranchName:"",
  });

  const [errors, setErrors] = useState({});

  // Fetch user profile data when the component mounts or when 'user' changes
  useEffect(() => {
    if (user && user.profile) {
      setFormData({
        mobile: user.profile.mobile || "",
        email: user.profile.email || "",
        social: user.profile.social || [], // Ensure this is an array
        address: user.profile.address || "",
        GST: user.profile.GST || "",
        PAN: user.profile.PAN || "",
        OTHERID: user.profile.OTHERID || "",
        Name: user.profile.Name || "",
        VedanId: user.profile.VedanId || "",
        BranchName: user.profile.BranchName || "",
      });
    }
  }, [user]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (e, index) => {
    const { value } = e.target;
    const updatedSocialLinks = [...formData.social];
    updatedSocialLinks[index] = value;
    setFormData((prev) => ({ ...prev, social: updatedSocialLinks }));
  };

  const handleToggleForm = (formType) => {
    setActiveForm(formType); // Set the active form
  };

  const handleAddSocialLink = () => {
    setFormData((prev) => ({ ...prev, social: [...prev.social, ""] }));
  };

  const handleRemoveSocialLink = (index) => {
    const updatedSocial = formData.social.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, social: updatedSocial }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields =
      activeForm === "verification"
        ? ["GST", "PAN", "OTHERID"]
        : activeForm === "founder"
        ? ["Name", "VedanId"]
        : ["mobile", "email", "address"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData); // Check form data here
  
       // Use sessionStorage for session-based login

      // On the client-side, use sessionStorage.getItem('token')
      const token = sessionStorage.getItem('token');
  
      try {
        const response = await axios.put('http://localhost:8000/api/v1/user/update-profile', formData, {
          withCredentials: true, // Make sure the cookie is sent along
        });
  
        if (response.status === 200) {
          setSubmissionStatus("Profile updated successfully!");
        } else {
          setSubmissionStatus("Failed to update profile. Please try again.");
        }
      } catch (error) {
        console.error(error);
        setSubmissionStatus("Failed to update profile. Try again.");
      }
    }
  };
  

  const TextInput = ({
    label,
    name,
    value,
    onChange,
    error,
    type = "text",
    placeholder,
  }) => (
    <div className="mb-4">
      <label className="text-gray-400">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return <div>No user found</div>;
  }

  return (
    <>
      {submissionStatus && (
        <div className="text-center text-white">{submissionStatus}</div>
      )}
      <div className="h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-[#20354b] px-4 py-6 shadow-lg flex flex-col justify-between overflow-auto">
          <div>
            {/* ProfileCard placed at the top */}
            <ProfileCard profile={user?.profile} />
          </div>

          {/* Sidebar Navigation */}
          <div
            className="text-white cursor-pointer hover:text-yellow-500 mb-4"
            onClick={() => handleToggleForm("contact")}
          >
            Contact
          </div>
          <div
            className="text-white cursor-pointer hover:text-yellow-500 mb-4"
            onClick={() => handleToggleForm("verification")}
          >
            Verification
          </div>
          <div
            className="text-white cursor-pointer hover:text-yellow-500 mb-4"
            onClick={() => handleToggleForm("founder")}
          >
            Founder
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="flex-1 bg-[#071e34] p-6 flex justify-start items-start overflow-auto">
          {/* Default Message when no form is selected */}
          {activeForm === "" && (
            <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
              <h2 className="text-white font-semibold text-lg mb-4">
                Welcome to Your Library Profile
              </h2>
              <p className="text-gray-300">
                It seems like you haven't selected a form yet. Please choose one
                from the menu to get started.
              </p>
              <p className="text-gray-400 mt-4">
                Your journey begins here. We are happy to assist you!
              </p>
            </div>
          )}

          {/* Conditional rendering based on activeForm state */}
          {activeForm === "contact" && (
            <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h3 className="text-white font-semibold text-lg">
                Edit Contact Details
              </h3>
              <form className="mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label className="text-gray-400">BranchName</label>
        <input
          type="text"
          name="BranchName"
          value={formData.BranchName}
          onChange={handleFormChange}
          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
          placeholder="Enter Branch Name"
        />
                  </div>
                {/* Social Media Links */}
                <div className="mb-4">
                  <label className="text-gray-400">Social Links</label>
                
                  {Array.isArray(formData.social) &&
                    formData.social.map((link, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={link}
                          onChange={(e) => handleSocialLinkChange(e, index)}
                          className="w-full mt-2 p-2 rounded-md bg-[#071e34] text-white border border-gray-600"
                          placeholder="Enter social media link"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveSocialLink(index)}
                          className="ml-2 text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                  <button
                    type="button"
                    onClick={handleAddSocialLink}
                    className="mt-2 w-full bg-yellow-500 text-white py-2 rounded-md"
                  >
                    Add Another Social Link
                  </button>
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
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
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

          {/* Similar rendering for "verification" and "founder" forms */}
          {activeForm === "verification" && (
  <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full max-w-lg">
    <h3 className="text-white font-semibold text-lg">
      Edit Verification Details
    </h3>
    <form className="mt-4" onSubmit={handleSubmit}>
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
        {errors.GST && (
          <p className="text-red-500 text-sm">{errors.GST}</p>
        )}
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
        {errors.PAN && (
          <p className="text-red-500 text-sm">{errors.PAN}</p>
        )}
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

{activeForm === "founder" && (
  <div className="mt-6 bg-[#20354b] p-6 rounded-lg shadow-lg w-full h-fit max-w-lg">
    <h3 className="text-white font-semibold text-lg">
      Edit Founder Details
    </h3>
    <form className="mt-4" onSubmit={handleSubmit}>
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
        {errors.Name && (
          <p className="text-red-500 text-sm">{errors.Name}</p>
        )}
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
        {errors.VedanId && (
          <p className="text-red-500 text-sm">{errors.VedanId}</p>
        )}
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
    </>
  );
};

export default LibraryProfile;

