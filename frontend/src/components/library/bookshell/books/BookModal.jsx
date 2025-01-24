import React from "react";

const BookModal = ({ books, onSelectBook, onClose }) => {
  if (!books || books.length === 0) {
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h3 className="text-xl font-semibold mb-4">No Books Available</h3>
          <button
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-400 transition duration-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Format Book ID function
  const formatBookId = (index) => {
    const currentYear = new Date().getFullYear();
    const bookNumber = (index + 1).toString().padStart(2, "0");
    return `(${currentYear}प${bookNumber})`;
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-semibold mb-6">Select a Book</h3>
        
        {/* Scrollable Book List */}
        <div className="max-h-80 overflow-y-auto space-y-4 mb-6">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="flex items-center p-4 cursor-pointer hover:bg-gray-200 rounded-lg transition-all duration-300"
              onClick={() => onSelectBook(book)} // Pass the book to onSelectBook
            >
              <div className="flex-shrink-0 w-12 h-16 bg-gray-200 rounded-md">
                {/* Placeholder for book cover image */}
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-lg font-medium text-gray-800">{book.title}</h4>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-sm text-gray-600">{formatBookId(index)}</p> {/* Display Book ID */}
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-6 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-400 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookModal;
