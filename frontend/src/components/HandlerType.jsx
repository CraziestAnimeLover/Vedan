import React, { useState } from 'react';

const HandlerType = ({ fullName, initialProfileNumber, initialRating, onProfileNumberChange, onRatingChange, initialHandlerName }) => {
  const [profileNumber, setProfileNumber] = useState(initialProfileNumber);
  const [rating, setRatingState] = useState(initialRating);
  const [handlerName, setHandlerName] = useState(initialHandlerName);

  return (
    <div className="flex gap-3 mt-2">
      {/* Card Container */}
      <div className="bg-white p-4 rounded-lg shadow-lg w-72">
        <div className="flex flex-col gap-3">
          {/* Handler Name */}
          <div className="text-lg font-semibold text-gray-800">
            <span>Handler Name: {handlerName || 'Not Provided'}</span>
          </div>
          {/* Rating */} 
          <div className="mt-3 flex flex-row gap-3">
            <span className="text-lg font-semibold text-gray-800">Rating:</span>
            <div className="text-lg font-bold text-gray-600">
              {rating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandlerType;
