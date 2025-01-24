import React, { useState } from "react";
import { useSelector } from "react-redux";
import BookModal from "./BookModal";

const Shells = () => {
  const books = useSelector((state) => state.books.items);
  const status = useSelector((state) => state.books.status);
  const [selectedBook, setSelectedBook] = useState(null);
  const [shelf, setShelf] = useState(Array(6).fill().map(() => Array(7).fill(null))); // 6x7 grid

  // Format Book ID function
  const formatBookId = (index) => {
    const currentYear = new Date().getFullYear();
    const bookNumber = (index + 1).toString().padStart(2, "0");
    return `(${currentYear}प${bookNumber})`;
  };

  const handleCellClick = (row, col) => {
    if (row === 0 || col === 0) {
      setSelectedBook({ row, col });
    }
  };

  const handleBookSelection = (book) => {
    if (!selectedBook) return;

    const { row, col } = selectedBook;

    // Create a new shelf array with updated values
    const newShelf = shelf.map((rowArray, rowIndex) =>
      rowArray.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? book : cell
      )
    );

    setShelf(newShelf);
    setSelectedBook(null); // Close the modal after selecting a book
  };

  const closeModal = () => {
    setSelectedBook(null); // Close the modal
  };

  // Function to add a row
  const addRow = () => {
    setShelf([...shelf, Array(shelf[0].length).fill(null)]);
  };

  // Function to remove a row
  const removeRow = () => {
    if (shelf.length > 1) {
      setShelf(shelf.slice(0, -1));
    }
  };

  // Function to add a column
  const addColumn = () => {
    setShelf(shelf.map((row) => [...row, null]));
  };

  // Function to remove a column
  const removeColumn = () => {
    if (shelf[0].length > 1) {
      setShelf(shelf.map((row) => row.slice(0, -1)));
    }
  };

  // Convert shelf data to a list format and download as text
  const downloadList = () => {
    const listContent = shelf
      .flatMap((row, rowIndex) =>
        row
          .map((cell, colIndex) =>
            cell ? `Row ${rowIndex + 1}, Column ${colIndex + 1}: ${cell.title} (Book ID: ${formatBookId(books.findIndex((b) => b.id === cell.id))})` : null
          )
          .filter((text) => text !== null)
      )
      .join("\n");

    const blob = new Blob([listContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "assigned_books_list.txt";
    link.click();
  };

  if (status === "loading") {
    return (
      <div className="bg-red-300 p-6 rounded-lg shadow-lg text-gray-800">
        <h2 className="text-xl font-semibold mb-4">Books Available</h2>
        <p className="text-center">Loading books...</p>
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

      {/* Controls to add/remove rows and columns */}
      <div className="flex gap-4 mb-4">
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addRow}>Add Row</button>
        <button className="bg-red-500 text-white p-2 rounded" onClick={removeRow}>Remove Row</button>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addColumn}>Add Column</button>
        <button className="bg-red-500 text-white p-2 rounded" onClick={removeColumn}>Remove Column</button>
      </div>

      {/* Shelf Grid with Row and Column Labels */}
      <div className="overflow-x-auto mb-4">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-200"></th>
              {Array.from({ length: shelf[0]?.length || 7 }).map((_, colIndex) => (
                <th key={colIndex} className="border p-2 bg-gray-200 text-center">
                  Column {colIndex + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shelf.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border p-2 bg-gray-200 text-center">Row {rowIndex + 1}</td>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border p-2 cursor-pointer ${cell ? 'bg-green-200' : 'bg-gray-100'}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {cell ? (
                      <span>{cell.title} {formatBookId(books.findIndex(b => b.id === cell.id))}</span>
                    ) : (
                      <span>Empty</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show Book Modal if a cell is clicked */}
      {selectedBook && (
        <BookModal
          books={books}
          onSelectBook={handleBookSelection}
          onClose={closeModal}
        />
      )}

      {/* Assigned Books List */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Assigned Books</h3>
        <ul>
          {shelf.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
              cell ? (
                <li key={`${rowIndex}-${colIndex}`} className="mb-2">
                  R{rowIndex + 1}, C{colIndex + 1}: {cell.title} Book ID: {formatBookId(books.findIndex(b => b.id === cell.id))}
                </li>
              ) : null
            )
          )}
        </ul>
      </div>

      {/* Download Button */}
      <div className="mt-4">
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={downloadList}
        >
          Download List
        </button>
      </div>
    </div>
  );
};

export default Shells;



