import React, { useState, useEffect } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import { useSelector, useDispatch } from 'react-redux';
import HandlerType from './HandlerType';  // Import HandlerType component
import UpdateProfileDialog from './UpdateProfileDialog';  // Import the dialog for updating profile

const skills = ["Html", "Css", "Javascript", "Reactjs"];
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // Generate a 10-digit number if not available
  const profileNumber = user?.profile?.userId || Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit random number
  
  const [currentProfileNumber, setCurrentProfileNumber] = useState(profileNumber);  // Ensure profile number is correctly set
  const [currentRating, setCurrentRating] = useState(user?.profile?.rating || 0);
  const [currentHandlerName, setCurrentHandlerName] = useState(user?.profile?.handlerName || '');

  const [updatedProfileNumber, setUpdatedProfileNumber] = useState(currentProfileNumber);
  const [updatedRating, setUpdatedRating] = useState(currentRating);
  const [updatedHandlerName, setUpdatedHandlerName] = useState(currentHandlerName);

  useEffect(() => {
    setUpdatedProfileNumber(currentProfileNumber);
  }, [currentProfileNumber]);

  const handleProfileNumberChange = (newProfileNumber) => {
    setUpdatedProfileNumber(newProfileNumber);
  };

  const handleRatingChange = (newRating) => {
    setUpdatedRating(newRating);
  };

  const handleHandlerNameChange = (newHandlerName) => {
    setUpdatedHandlerName(newHandlerName);
  };

  const handleSubmit = async () => {
    // Simulate an API call or redux action to update the profile
    try {
      // Dispatch to update the profile data in the backend or store
      dispatch({ type: 'UPDATE_PROFILE', payload: { updatedProfileNumber, updatedRating, updatedHandlerName } });

      // Update the displayed profile number, rating, and handler name after submission
      setCurrentProfileNumber(updatedProfileNumber);
      setCurrentRating(updatedRating);
      setCurrentHandlerName(updatedHandlerName);
      setOpen(false); // Close the update profile dialog
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24 relative">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>

            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
              <HandlerType 
                fullName={user?.fullname}
                initialProfileNumber={updatedProfileNumber}
                initialRating={updatedRating}
                initialHandlerName={updatedHandlerName}
                onProfileNumberChange={handleProfileNumberChange}
                onRatingChange={handleRatingChange}
                onHandlerNameChange={handleHandlerNameChange}
              />
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
        </div>

        {/* Profile Information in Column */}
        {/* <div className="my-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Full Name: {user?.fullname}</span>
            <span className="text-sm text-gray-500">Profile Number: {currentProfileNumber}</span>
            <span className="text-sm text-gray-500">Rating: {currentRating}</span>
            <span className="text-sm text-gray-500">Handler Name: {currentHandlerName || 'Not Provided'}</span>
          </div>
        </div> */}

        {/* Contact Information */}
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0
              ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              : <span>NA</span>
            }
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume
            ? <a target="blank" href={user?.profile?.resume} className="text-blue-500 w-full hover:underline cursor-pointer">{user?.profile?.resumeOriginalName}</a>
            : <span>NA</span>
          }
        </div>
      </div>

      {/* Display Submit Button to Save Profile Changes */}
      <div className="flex justify-center mt-5">
        <Button onClick={handleSubmit} variant="solid" className="text-white bg-blue-500">Save Changes</Button>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Applied Job Table */}
        <AppliedJobTable />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
