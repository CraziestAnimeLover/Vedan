import React from "react";

const BookShell = ({
  title,
  author,
  genre,
  year,
  isbn,
  format,
  language,
  price,
  quantity,
}) => {
  return (
    <div className="border rounded-lg p-6 shadow-md bg-white">
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
  );
};

export default BookShell;
