import React from "react";

const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available</p>
      ) : (
        books.map(
          ({
            _id,           // Use MongoDB's ObjectId
            title,
            author,
            genre,
            year,
            isbn,
            format,
            language,
            price,
            quantity,
            imageUrl,      // Optional: Add this field for book images
          }) => (
            <div key={_id} className="border rounded-lg p-6 shadow-md bg-white">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-2xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700">Author: {author}</p>
              <p className="text-gray-700">Genre: {genre}</p>
              <p className="text-gray-700">Year: {year}</p>
              <p className="text-gray-700">ISBN: {isbn}</p>
              <p className="text-gray-700">Format: {format}</p>
              <p className="text-gray-700">Language: {language}</p>
              <p className="text-gray-700">Price: ${price}</p>
              <p className="text-gray-700">Quantity Available: {quantity}</p>

              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default BookList;
