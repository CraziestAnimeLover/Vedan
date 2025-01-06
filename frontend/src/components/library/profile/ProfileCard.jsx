import React from 'react';

// ProfileCard Component
const ProfileCard = ({ profile }) => {
  const { profilePicture, fullName, contactName, vedannId } = profile;

  return (
    <div className="absolute top-16 left-4 flex flex-col items-center justify-center p-12 mt-12 bg-white shadow-lg rounded-lg w-72">
      <img
        src={profilePicture}
        alt="Profile Picture"
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold">{fullName}</h2>
      <p className="text-gray-600 mt-2">{contactName}</p>
      <p className="text-gray-500 mt-1">Vedann ID: {vedannId}</p>
    </div>
  );
};

export default ProfileCard;
