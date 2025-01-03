import React, { useState } from 'react';
import Rating from './ui/Rating'; // Assuming you have a Rating component

const HandlerType = ({ fullName, initialProfileNumber, initialRating, onProfileNumberChange, onRatingChange, initialHandlerName }) => {
  const [profileNumber, setProfileNumber] = useState(initialProfileNumber);
  const [rating, setRatingState] = useState(initialRating);
  const [handlerName, setHandlerName] = useState(initialHandlerName);

  // Handler for profile number change
  const handleProfileNumberChange = (event) => {
    const newProfileNumber = event.target.value;
    setProfileNumber(newProfileNumber);
    onProfileNumberChange(newProfileNumber); // Pass to parent component
  };

  // Handler for rating change
  const handleRatingChange = (newRating) => {
    setRatingState(newRating);
    onRatingChange(newRating); // Pass to parent component
  };

  return (
    <div className="flex gap-3 mt-2">
      {/* Card Container */}
      <div className="bg-white p-2 rounded-lg shadow-lg w-72">
        <div className="flex flex-col gap-1">
          {/* <span className="text-lg font-semibold text-gray-800">Handler Info</span> */}
          <div className="text-lg font-semibold text-gray-800">
            {/* Display Handler Name */}
            <span>Handler {handlerName || 'Not Provided'}</span>
          </div>
          <div className="text-sm text-gray-500">
            {/* Display Rating */}
            {/* <span>Rating: {rating}</span> */}
          </div>
        </div>

        {/* You can add a Rating component here */}
        <div className="mt-3">
          {/* Assuming the Rating component allows selecting a rating */}
          <Rating rating={rating} onRatingChange={handleRatingChange} />
        </div>

        {/* Input for Profile Number */}
        {/* <div className="mt-1">
          <label htmlFor="profileNumber" className="text-sm text-gray-600">Profile Number:</label>
          <input
            id="profileNumber"
            type="text"
            value={profileNumber}
            onChange={handleProfileNumberChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-sm"
          />
        </div> */}
      </div>
    </div>
  );
};

export default HandlerType;
