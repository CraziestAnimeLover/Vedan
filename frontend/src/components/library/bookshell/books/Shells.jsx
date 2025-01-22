import React, { useState } from "react";
import { useSelector } from "react-redux";
import BookList from "./BookList";
import BookModal from "./BookModal";

const Shells = () => {
  const books = useSelector((state) => state.books.items);
  const status = useSelector((state) => state.books.status);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book to display in the modal
  };

  const closeModal = () => {
    setSelectedBook(null); // Close the modal by setting the selected book to null
  };

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

      {/* Render Book List */}
      <BookList books={books} onBookClick={handleBookClick} />

      {/* Show Book Modal if a book is selected */}
      {selectedBook && <BookModal book={selectedBook} onClose={closeModal} />}
    </div>
  );
};

export default Shells;
