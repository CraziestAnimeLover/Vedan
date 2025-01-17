import React from "react";

const BookList = ({ books }) => {
  const formatBookId = (index) => {
    // Get the current year
    const currentYear = new Date().getFullYear();
    
    // Generate the book number with leading zeros, starting from 00001, 00002, etc.
    const bookNumber = (index + 1).toString().padStart(2, "0");

    // Construct the book ID as (YYYYBXXXXX)
    return `(${currentYear}प${bookNumber})`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available</p>
      ) : (
        books.map(
          ({
            _id,
            title,
            author,
            isbn,
            publisherDate,
            publisher,
            format,
            language,
            price,
            copies,
            pages,
            imageUrl,
          }, index) => (
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
              <p className="text-gray-700">Publisher: {publisher}</p>
              <p className="text-gray-700">Publisher Date: {publisherDate}</p>
              <p className="text-gray-700">ISBN: {isbn}</p>
              <p className="text-gray-700">Format: {format}</p>
              <p className="text-gray-700">Language: {language}</p>
              <p className="text-gray-700">Price: ${price}</p>
              <p className="text-gray-700">Copies: {copies}</p>
              <p className="text-gray-700">Pages: {pages}</p>
              <p className="text-gray-700">Book ID: {formatBookId(index)}</p> {/* Display formatted book ID */}

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
