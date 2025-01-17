import React from "react";
import { useSelector } from "react-redux";
import BookList from "./BookList";

const BookListSection = () => {
  const books = useSelector((state) => state.books.items);
  const status = useSelector((state) => state.books.status);

  if (status === "loading") {
    return <p>Loading books...</p>;
  }

  if (status === "failed") {
    return <p>Error loading books. Please try again.</p>;
  }

  return (
    <div className="bg-red-300 p-6 rounded-lg shadow-lg text-gray-800">
      <h2 className="text-xl font-semibold mb-4">Books Available</h2>
      {books.length > 0 ? (
        <BookList books={books} />
      ) : (
        <p className="text-gray-500 text-center">No books found.</p>
      )}
    </div>
  );
};

export default BookListSection;
