import React from 'react';
import ProfileCard from './ProfileCard'; // Import the ProfileCard componen
import Attendance from '../../attendence/Attendance';

const LibraryProfile = () => {
    const profile = {
        profilePicture: 'https://randomuser.me/api/portraits/men/21.jpg', // Use a real URL for an image
        fullName: 'John Doe',
        contactName: 'John D.',
        vedannId: 'VD123456',
      };
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <ProfileCard profile={profile} /> {/* Pass the profile object to ProfileCard */}
      <Attendance/>
    </div>
  )
}

export default LibraryProfile