import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { updateProfile } from '../../../../redux/updateProfileSlice';

const ProfileCard = ({ profile = { name: 'Default Name' } }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const {
    profilePicture = user?.profile?.profilePhoto || '',
    fullName = user?.fullname || '',
    email = user?.email || '',
    phoneNumber = user?.phoneNumber || '',
    Name = user?.Name|| '',
    _id = 'Not Assigned',
  } = profile || {};

  const [image, setImage] = useState(profilePicture);
  const [name, setName] = useState(fullName);
  const [emailAddress, setEmailAddress] = useState(email);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);

const handleNameClick = () => {
  setIsEditingName(true);
};

const handleNameChange = (e) => {
  setName(e.target.value);
};

const handleNameBlur = () => {
  setIsEditingName(false);
};

const handleNameKeyDown = (e) => {
  if (e.key === "Enter") {
    handleNameBlur();
  }
};


  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Name is required.';
    if (!emailAddress.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      errors.email = 'A valid email is required.';
    }
    return errors;
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setName(fullName); // Ensure the name is set when switching to edit mode
  };
  
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file under 2MB.');
    }
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const updatedProfile = { fullName: name, email: emailAddress, profilePicture: image };
      await dispatch(updateProfile(updatedProfile));
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!profile && !user) {
    return <div>Error: No profile or user data available.</div>;
  }

  return (
    <section className="font-medium rounded-2xl flex justify-start items-start px-1/2 py-1/2 h-fit">
      <section className="w-48 bg-[#20354b] rounded-2xl mx-2 px-4 py-1 shadow-lg h-fit">
        <div className="flex flex-col items-center">
          {isEditing ? (
            <>
              <input
      type="text"
      value={name}
      onChange={handleNameChange}
      onBlur={handleNameBlur}
      onKeyDown={handleNameKeyDown} // Press "Enter" to save
      autoFocus
      className="text-white bg-transparent border-b border-yellow-400 text-center font-bold text-xl tracking-wide outline-none p-1 mb-1"
    />
              {/* {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>} */}
            </>
          ) : (
            <span className="text-2xl text-white">{name}</span> // ✅ Now displays the full name when not editing
          )}
        </div>

        <div className="bg-[#20354b] rounded-lg shadow-lg w-40 h-64 flex flex-col items-center justify-center relative">
          <div
            style={{
              fontSize: '18rem', // Adjust text size here
              letterSpacing: '2px',
              color: 'white',
              position: 'relative',
              marginBottom: "45px",
            }}
          >
            व
            <div
              style={{
                position: 'absolute',
                inset: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              {image ? (
                <img
                  src={image}
                  alt="Profile"
                  style={{
                    width: '89px',
                    height: '89px',
                    marginTop: '42px',
                    marginRight: '8px',
                    borderRadius: '50%',
                    border: '4px solid white',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '88px',
                    height: '88px',
                    marginTop: '42px',
                    marginRight: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#ccc',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '4px solid white',
                  }}
                ></div>
              )}
            </div>
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleProfilePictureChange}
            />
          </div>
        </div>

        <div>
          {isEditing ? (
            <>
              <div className="flex items-center gap-3">
                <Mail className="text-yellow-500" />
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="text-white bg-transparent border-b border-yellow-400 outline-none p-4"
                  placeholder="Email Address"
                />
              </div>
              {formErrors.email && <span className="text-red-500 text-xs">{formErrors.email}</span>}
            </>
          ) : (
            <div className="flex items-center gap-1">
              <Mail />
              <span className="text-xl text-white">{emailAddress}</span>
            </div>
          )}
        </div>

        <div className="text-white text-sm mt-4">
          <span className="text-gray-400 font-semibold">Vedann ID:</span>
          <span> {_id}</span>
        </div>

        {user?.role === 'librarian' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-4 text-yellow-500 text-center"
          >
            Welcome, Librarian! You can manage libraries here.
          </motion.div>
        )}

<div className="flex flex-col items-center">
  {isEditingName ? (
    <input
      type="text"
      value={name}
      onChange={handleNameChange}
      onBlur={handleNameBlur}
      onKeyDown={handleNameKeyDown} // Press "Enter" to save
      autoFocus
      className="text-white bg-transparent border-b border-yellow-400 text-center font-bold text-xl tracking-wide outline-none p-1 mb-1"
    />
  ) : (
    <span
      className="text-2xl text-white cursor-pointer"
      onClick={handleNameClick} // Click to edit
    >
      {name || "Click to add name"}
    </span>
  )}
</div>


      </section>
    </section>
  );
};

export default ProfileCard;
