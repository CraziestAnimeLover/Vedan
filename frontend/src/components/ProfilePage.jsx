import React, { useState } from 'react';
import HandlerType from './HandlerType'; // Import HandlerType
import UpdateProfileDialog from './UpdateProfileDialog'; // Import UpdateProfileDialog

const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    handlerName: 'John Doe',
    profileNumber: '12345',
    rating: 4.5,
  });

  // Function to handle profile update from UpdateProfileDialog
  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  return (
    <div>
      {/* Pass userProfile data to HandlerType */}
      <HandlerType
        handlerName={userProfile.handlerName}
        profileNumber={userProfile.profileNumber}
        rating={userProfile.rating}
      />
      
      {/* Pass setOpen function to UpdateProfileDialog */}
      <UpdateProfileDialog
        open={open}
        setOpen={setOpen}
        onProfileUpdate={handleProfileUpdate} // Pass the handler to update profile
      />
      
      {/* Button to open the UpdateProfileDialog */}
      <button onClick={() => setOpen(true)}>Update Profile</button>
    </div>
  );
};

export default ProfilePage;
