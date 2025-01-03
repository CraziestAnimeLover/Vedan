import React, { useState } from 'react';

const CircularRating = ({ rating, onRatingChange }) => {
  const handleRatingChange = (newRating) => {
    onRatingChange(newRating);
  };

  return (
    <div className="relative flex items-center justify-center">
      {/* Circle Progress */}
      <div
        className="w-32 h-32 rounded-full bg-gray-200 relative flex items-center justify-center"
        style={{
          background: `conic-gradient(#4db8ff 0deg, #4db8ff ${rating * 3.6}deg, #f1f1f1 ${rating * 3.6}deg, #f1f1f1 360deg)`
        }}
      >
        {/* Rating Number */}
        <div className="absolute text-lg font-semibold text-gray-800">{rating}%</div>
      </div>

      {/* Rating Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={rating}
        onChange={(e) => handleRatingChange(Number(e.target.value))}
        className="w-full mt-4"
      />
    </div>
  );
};

export default CircularRating;
