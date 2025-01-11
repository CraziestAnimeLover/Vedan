import React from "react";
import BookList from "./BookList";

const BookListSection = ({ books }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-4 text-purple-800">
        Books Available
      </h2>
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <div className="text-center text-gray-500 mt-6">
          <p>No books found.</p>
          <p className="mt-4">Start adding some books to your library!</p>
        </div>
      )}
    </div>
  );
};

export default BookListSection;
