import React, { useState } from "react";
import { useSelector } from "react-redux";
import BookList from "./BookList";

const BookListSection = ({ onBookClick }) => {
  const books = useSelector((state) => state.books.items);
  const status = useSelector((state) => state.books.status);

  if (status === "loading") {
    return (
      <div className="bg-red-300 p-6 rounded-lg shadow-lg text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Books Available</h2>
        <p className="text-center">Loading books...</p>
        <div className="flex justify-center">
          <div className="spinner-border text-white" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-red-300 p-6 rounded-lg shadow-lg text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Books Available</h2>
        <p className="text-center text-red-600">Error loading books. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
      <h2 className="text-xl font-semibold mb-4">Books Available</h2>
      {books.length > 0 ? (
        <ul className="space-y-2">
          {books.map((book, index) => (
            <li
              key={book.id}
              onClick={() => onBookClick(book)} // Trigger book selection
              className="cursor-pointer hover:bg-gray-200 p-2 rounded"
            >
              {index + 1}. {book.title}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No books found.</p>
      )}
    </div>
  );
};

export default BookListSection;
