import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../../redux/booksSlice";
import Navbar from "../../shared/Navbar";
import AddBook from "./books/AddBook";
import BookListSection from "./books/BookListSection";
import Shells from "./books/Shells";


const Libshell = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books?.list || []);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const bookListRef = useRef(null);
  const formRef = useRef(null);
  const detailsRef = useRef(null);

  // Fetch books when the component mounts
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setShowAddForm(false);
  };

  const scrollUp = () => {
    if (bookListRef.current) {
      bookListRef.current.scrollTop -= 100; // Adjust scroll amount as needed
    }
  };

  const scrollDown = () => {
    if (bookListRef.current) {
      bookListRef.current.scrollTop += 100; // Adjust scroll amount as needed
    }
  };

  // Close the form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddForm(false);
      }
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setSelectedBook(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-green-500 to-teal-400 min-h-screen text-white">
        <div className="container mx-auto p-6 flex">
          {/* Sidebar: Book List */}
          <div className="w-1/4 bg-white text-gray-800 rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={scrollUp}
                className="text-gray-800 hover:text-gray-500"
              >
                ↑
              </button>
              <button
                onClick={scrollDown}
                className="text-gray-800 hover:text-gray-500"
              >
                ↓
              </button>
            </div>
            <div
              className="overflow-y-auto max-h-[400px]"
              ref={bookListRef}
            >
              <BookListSection books={books} onBookClick={handleBookClick} />
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4 pl-6 relative">
            <button
              className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowAddForm(true)}
            >
              Add a New Book
            </button>
            <div className="text-center mb-10 mt-6">
              <h1 className="text-4xl font-bold"></h1>
              <p className="text-lg mt-2 text-green-200">
                
              </p>
            </div>

            {/* Conditional Rendering */}
            {selectedBook && !showAddForm && (
              <div
                ref={detailsRef}
                className="bg-white p-6 rounded-lg shadow-lg text-gray-800"
              >
                <h2 className="text-2xl font-bold mb-4">Title: {selectedBook.title}</h2>
                <p className="mb-2"><strong>Author:</strong> {selectedBook.author}</p>
                <p className="mb-2"><strong>Description:</strong> {selectedBook.description}</p>
                <p className="text-gray-700 mb-2"><strong>Publisher:</strong> {selectedBook.publisher}</p>
                <p className="text-gray-700 mb-2"><strong>Publisher Date:</strong> {selectedBook.publisherDate}</p>
                <p className="text-gray-700 mb-2"><strong>ISBN:</strong> {selectedBook.isbn}</p>
                <p className="text-gray-700 mb-2"><strong>Format:</strong> {selectedBook.format}</p>
                <p className="text-gray-700 mb-2"><strong>Language:</strong> {selectedBook.language}</p>
                <p className="text-gray-700 mb-2"><strong>Price:</strong> ${selectedBook.price}</p>
                <p className="text-gray-700 mb-2"><strong>Copies:</strong> {selectedBook.copies}</p>
                <p className="text-gray-700 mb-2"><strong>Pages:</strong> {selectedBook.pages}</p>
              </div>
            )}

            {showAddForm && (
              <div
                ref={formRef}
                className="bg-white p-6 rounded-lg shadow-lg text-gray-800"
              >
                <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
                <AddBook />
              </div>
            )}

            {!selectedBook && !showAddForm && (
              <div className="text-gray-300 text-center">
                {/* <p>Select a book to view details or add a new book.</p> */}
              </div>
            )}
          </div>
        </div>
      <Shells/>
      </div>
    </>
  );
};

export default Libshell;
