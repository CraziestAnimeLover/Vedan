import React, { useState } from 'react';
import { Avatar, AvatarImage } from '../../../ui/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Contact, Mail, Edit } from 'lucide-react';  // Added Mail and Edit icons
import { updateProfile } from '../../../../redux/updateProfileSlice'; // Correct path to store.js

const ProfileCard = ({ profile }) => {
  const { profilePicture, fullName, email, phoneNumber, _id } = profile;
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  
  const [image, setImage] = useState(profilePicture || user?.profile?.profilePhoto);
  const [name, setName] = useState(fullName || user?.fullname || '');
  const [emailAddress, setEmailAddress] = useState(email || user?.email || '');
  
  const [isEditing, setIsEditing] = useState(false);  // State to toggle between view/edit modes

  // Handle file input change for profile picture
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the uploaded image as the new profile picture
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle submit for updating profile
  const handleSubmit = async () => {
    if (loading) return; // Avoid submitting while loading
    try {
      const updatedProfile = {
        fullName: name,
        email: emailAddress,
        profilePicture: image, // The profile picture (image) is updated
      };
      await dispatch(updateProfile(updatedProfile)); // Dispatch the update action
      setIsEditing(false);  // Exit edit mode
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <section
      style={{ fontFamily: 'Montserrat' }}
      className="bg-[#c41a8e] font-medium rounded-2xl flex justify-start  items-start px-2 py-2 h-fit"
    >
      <section className="w-48 bg-[#20354b] rounded-2xl mx-2 px-4 py-2 shadow-lg h-fit">
        {/* Full Name */}
        <div className="flex flex-col items-center ">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-white bg-transparent border-b-1 border-yellow-400 text-center font-bold text-xl tracking-wide outline-none p-1 mb-1"
              placeholder="Full Name"
            />
          ) : (
            <span className="text-2xl text-white ">{name || user?.name || '+1234567890'}</span>
          )}
        </div>

        {/* Profile Picture */}
        <div className="mt-1 flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={image} alt="profile" />
          </Avatar>
        </div>

        {/* File Input for Profile Picture */}
        <div className="mt-1 text-center">
          <label
            htmlFor="file-input"
            className="cursor-pointer text-yellow-500 underline"
          >
            Change Profile Picture
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
          />
        </div>

        {/* Email */}
        <div className="">
          {isEditing ? (
            <div className="flex items-center gap-3">
              <Mail className="text-yellow-500" /> {/* Added Mail icon */}
              <input
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="text-white bg-transparent border-b-1 border-yellow-400 outline-none p-1"
                placeholder="Email Address"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3 ">
              <Mail />
              <span className="text-xl text-white">{email || user?.email || 'example@gmail.com'}</span>
            </div>
          )}
        </div>

        {/* Phone Number */}
        <div className="mt-4 text-white">
          <div className="flex items-center gap-3 ">
            <Contact />
            <span>{phoneNumber || user?.phoneNumber || '+1234567890'}</span>
          </div>
        </div>

        {/* Vedann ID - Display _id here */}
        <div className=" text-white text-sm">
          <span className="text-gray-400 font-semibold">Vedann ID:</span>
          <span> {_id || 'Not Assigned'}</span>
        </div>

        {/* Librarian-Specific Message */}
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

        {/* Edit Profile Button */}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600"
          >
            Edit Profile
          </button>
        )}

        {/* Submit Button */}
        {isEditing && (
          <button
            onClick={handleSubmit}
            className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600"
          >
            Save Changes
          </button>
        )}
      </section>
    </section>
  );
};

export default ProfileCard;
