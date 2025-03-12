import React from 'react';

const Review = ({ name, date, time, id, comment, reply }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex gap-x-48 items-start w-96">
      <div>
        <h2 className="text-lg font-semibold">Name{name}</h2>
        <p className="text-sm text-gray-500">ID: {id}</p>
        <p className="mt-2">Comment{comment}</p>
        {reply && (
          <div className="mt-2 p-2 border-l-4 border-gray-300 bg-gray-100">
            <p className="text-sm text-gray-600">Reply: {reply}</p>
          </div>
        )}
      </div>
      <div className="text-right flex gap-4 text-sm text-gray-500">
        <p>Date{date}</p>
        <p>time{time}</p>
      </div>
    </div>
  );
};

export default Review;