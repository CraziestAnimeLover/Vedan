import React, { useState } from 'react';
import { Avatar, AvatarImage } from '../../../ui/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Contact, Mail } from 'lucide-react';
import { updateProfile } from '../../../../redux/updateProfileSlice';

const ProfileCard = ({ profile }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const {
    profilePicture = user?.profile?.profilePhoto || '',
    fullName = user?.fullname || '',
    email = user?.email || '',
    phoneNumber = user?.phoneNumber || '',
    _id = 'Not Assigned',
  } = profile || {};

  const [image, setImage] = useState(profilePicture);
  const [name, setName] = useState(fullName);
  const [emailAddress, setEmailAddress] = useState(email);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) errors.name = 'Name is required.';
    if (!emailAddress.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      errors.email = 'A valid email is required.';
    }
    return errors;
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
      <section className="w-48 bg-[#20354b] rounded-2xl mx-2 px-4 py-2 shadow-lg h-fit">
        <div className="flex flex-col items-center">
          {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-white bg-transparent border-b border-yellow-400 text-center font-bold text-xl tracking-wide outline-none p-1 mb-1"
                placeholder="Full Name"
              />
              {formErrors.name && <span className="text-red-500 text-xs">{formErrors.name}</span>}
            </>
          ) : (
            <span className="text-2xl text-white">{name}</span>
          )}
        </div>

        <div className="mt-1 flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={image} alt="profile" />
          </Avatar>
        </div>

        <div className="mt-1 text-center">
          <label htmlFor="file-input" className="cursor-pointer text-yellow-500 underline">
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

        <div className="">
          {isEditing ? (
            <>
              <div className="flex items-center gap-3 ">
                <Mail className="text-yellow-500" />
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="text-white bg-transparent border-b border-yellow-400 outline-none p-4"
                  placeholder="Email Address"
                />
              </div>
              {formErrors.email && (
                <span className="text-red-500 text-xs">{formErrors.email}</span>
              )}
            </>
          ) : (
            <div className="flex items-center gap-1">
              <Mail />
              <span className="text-xl text-white ">{emailAddress}</span>
            </div>
          )}
        </div>

        <div className="mt-4 text-white">
          <div className="flex items-center gap-3">
            <Contact />
            <span>{phoneNumber}</span>
          </div>
        </div>

        <div className="text-white text-sm">
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

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </section>
    </section>
  );
};

ProfileCard.defaultProps = {
  profile: null,
};

export default ProfileCard;
