import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BookList from "./books/BookList";
import AddBook from "./books/AddBook";
import BookSearch from "./books/BookSearch";
import Navbar from "../../shared/Navbar";

const Libshell = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch books from the backend when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/library/books");
        setBooks(response.data.books); // Assuming 'books' is the array of books returned
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (book) => {
    try {
      // Make a request to the backend to add the book
      const response = await axios.post("http://localhost:8000/api/v1/library/books", book);
      const addedBook = response.data.book; // Assuming response contains the added book

      // Immediately add the new book to the state (this will re-render the BookList with the new book)
      setBooks((prevBooks) => [...prevBooks, addedBook]);

      // Optionally, you can navigate to a different page if needed
      navigate("/mgtservice/mgtlibrary/bookshell/books", {
        state: { books: [...books, addedBook] }, // Pass updated books via state
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-purple-600 to-blue-500 min-h-screen text-white">
        <div className="container mx-auto p-6">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold">Library Management System</h1>
            <p className="text-lg mt-2 text-purple-200">
              Organize and manage your books effortlessly
            </p>
          </div>

          {/* Search and Add Book Section */}
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
                <h2 className="text-xl font-semibold mb-4">Search Books</h2>
                <BookSearch
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
                <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
                <AddBook addBook={addBook} />
              </div>
            </div>
          </div>

          {/* Book List Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Books Available</h2>
            {filteredBooks.length > 0 ? (
              <BookList books={filteredBooks} />
            ) : (
              <p className="text-gray-500 text-center">No books found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Libshell;
