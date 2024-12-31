import React from 'react';

const QuoteCard = ({ quote, author }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-6">
        <blockquote className="italic text-gray-700 text-lg">
          "{quote}"
        </blockquote>
        <p className="mt-4 text-right text-gray-900 font-bold">- {author}</p>
      </div>
    </div>
  );
};

export default QuoteCard;
