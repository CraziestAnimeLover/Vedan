import React from 'react';

const Rating = ({ rating, onRatingChange }) => {
    const handleRatingChange = (newRating) => {
        onRatingChange(newRating);
    };

    return (
        <div className="flex items-center">
            <span className="mr-2">Rating: {rating}</span>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        className={`p-1 ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                        onClick={() => handleRatingChange(star)}
                    >
                        ★
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Rating;
