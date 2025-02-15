import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Profiles = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);  // Fetch user from Redux store

  const {
    profilePicture = user?.profile?.profilePhoto || '',
    fullName = user?.fullname || '',
    _id = 'Not Assigned',
  } = user || {};

  const [image, setImage] = useState(profilePicture);

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

  const handleImageClick = () => {
    document.getElementById('fileInput').click();  // Trigger file input
  };

  // Format the Vedann ID by taking the first 5 characters from _id
  let formattedVedannId = 'व 00000';  // Default value

  if (_id !== 'Not Assigned' && _id.length >= 5) {
    formattedVedannId = `व ${_id.slice(0, 5)}`; // Take first 5 digits (or chars) from the _id
  } else if (_id !== 'Not Assigned') {
    formattedVedannId = `व ${_id.padStart(5, '0')}`; // If _id is less than 5 digits, pad with 0
  }

  return (
    <>
      <div className="flex items-center justify-center w-30 mx-4 bg-gray-900">
        
      
        <div className="flex mt-3 relative mx-4">
          <div
            className="w-24 h-24 rounded-full bg-gray-500 flex justify-center items-center my-8 mx-24 mr-3 border-8 border-white cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleImageClick}
          >
            {image ? (
              <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-4xl text-white">👤</span>
            )}
          </div>

          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleProfilePictureChange}
          />

          <div className="w-2 h-36 bg-white mx-6 absolute left-36 transform -translate-x-1/2 top-2"></div>
          <div className="w-32 h-2 bg-white absolute left-36 top-0.5 transform -translate-x-1/2"></div>

          <div className="text-left me-2 mt-4 text-white flex flex-col">
            <h2 className="text-2xl font-semibold">{fullName || 'John Doe'}</h2>
            <h2 className="text-sm">Vedann Id:      {formattedVedannId}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profiles;
