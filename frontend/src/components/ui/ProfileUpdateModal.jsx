import React, { useState } from 'react';
import { Modal } from '../ui/modal'; // Adjust this import based on your modal component location
import { Button } from '../ui/button';

const ProfileUpdateModal = ({ isOpen, onClose, user }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleProfileUpdate = () => {
    // Logic to handle profile update
    console.log("Profile updated", updatedUser);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-content">
        <h3>Update Profile</h3>
        <div>
          <input
            type="text"
            value={updatedUser.fullname}
            onChange={(e) => setUpdatedUser({ ...updatedUser, fullname: e.target.value })}
            placeholder="Full Name"
          />
        </div>
        <div>
          <Button onClick={handleProfileUpdate}>Update Profile</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileUpdateModal;
