import React from "react";

const BookModal = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
          X
        </button>
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-48 object-cover rounded-md my-4"
        />
        <p className="text-lg font-semibold">Author: {book.author}</p>
        <p className="text-gray-500 mt-2">{book.description}</p>
        <p className="text-sm mt-2">
          Status: {book.status === "available" ? "Available" : "Checked Out"}
        </p>
      </div>
    </div>
  );
};

export default BookModal;
