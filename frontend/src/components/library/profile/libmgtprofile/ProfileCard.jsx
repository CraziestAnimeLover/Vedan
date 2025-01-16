import React, { useState } from 'react';

const ProfileCard = ({ profile }) => {
  const { profilePicture, fullName, email, phoneNumber, vedannId, address } = profile;

  const [image, setImage] = useState(profilePicture);

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

  return (
    <section
      style={{ fontFamily: 'Montserrat' }}
      className="bg-[#c41a8e] font-medium rounded-2xl flex justify-start items-start px-4 py-6"
    >
      <section className="w-64 bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
        {/* Timestamp and More Options */}
        <div className="flex items-center justify-between">
          <span className="text-white justify-center flex font-bold text-2xl tracking-wide">{fullName}</span>
        </div>

        {/* Profile Picture */}
        <div className="mt-6 w-fit pe-16 mx-[-2]">
          <img
            src={image}
            className="rounded-full w-28 cursor-pointer"
            alt="profile"
            onClick={() => document.getElementById('file-input').click()} // Trigger file input on click
          />
          <div className=" flex h-1 w-full bg-black mt-8 rounded-full">
            <div className="h-1 rounded-full w-2/5 bg-yellow-500"></div>
          </div>
        </div>

        {/* Hidden File Input */}
        <div className="mt-4 rounded-full w-2/5">
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden" // Hide the input
          />
        </div>

        {/* Storage */}
       

        {/* Vedann ID */}
        <div className="mt-2 text-white text-sm">
          <span className="text-gray-400 font-semibold">Vedann ID:</span>
          <span> {vedannId}</span>
        </div>
      </section>
    </section>
  );
};

export default ProfileCard;
