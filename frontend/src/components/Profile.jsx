import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../redux/updateProfileSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [updatedProfileNumber, setUpdatedProfileNumber] = useState(user?.profile?.userId || '');
  const [updatedRating, setUpdatedRating] = useState(user?.profile?.rating || 0);
  const [updatedHandlerName, setUpdatedHandlerName] = useState(user?.profile?.handlerName || '');
  const [editableHandlerName, setEditableHandlerName] = useState(false);

  const handleProfileNumberChange = (newProfileNumber) => {
    setUpdatedProfileNumber(newProfileNumber);
  };

  const handleRatingChange = (newRating) => {
    setUpdatedRating(newRating);
  };

  const handleHandlerNameChange = (e) => {
    setUpdatedHandlerName(e.target.value);
  };

  const handleSubmit = async () => {
    if (loading) return;
    try {
      await dispatch(updateProfile({ updatedProfileNumber, updatedRating, updatedHandlerName }));
      toast.success("Profile updated successfully!");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <motion.div
        className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Avatar className="h-24 w-24 relative">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
              </Avatar>
            </motion.div>
            <div>
              <motion.h1
                className="font-medium text-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {user?.fullname}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {user?.profile?.bio}
              </motion.p>
              {user?.role === 'librarian' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Welcome, Librarian! You can manage libraries here.
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  Welcome, Student! Browse libraries and apply for jobs.
                </motion.div>
              )}
            </div>
          </div>
          <motion.button
            onClick={() => setOpen(true)}
            className="text-right"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <Pen />
          </motion.button>
        </div>

        <motion.div
          className="my-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </motion.div>

        {/* Editable Name Section */}
        <motion.div
          className="my-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <h1 className="font-bold text-lg">Handler Name</h1>
          {editableHandlerName ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={updatedHandlerName}
                onChange={handleHandlerNameChange}
                className="border p-2 rounded-md"
              />
              <Button onClick={() => setEditableHandlerName(false)} className="bg-blue-500 text-white">Save</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>{updatedHandlerName}</span>
              <Button onClick={() => setEditableHandlerName(true)} className="bg-gray-300">Edit</Button>
            </div>
          )}
        </motion.div>

        {/* Save Changes Button */}
        <motion.div
          className="flex justify-center mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Button onClick={handleSubmit} variant="solid" className="text-white bg-blue-500" disabled={loading}>
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 118 8 8 8 0 01-8-8z"></path>
                </svg>
                Updating...
              </div>
            ) : (
              'Save Changes'
            )}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
