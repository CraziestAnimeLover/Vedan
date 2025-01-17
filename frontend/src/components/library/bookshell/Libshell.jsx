import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../../../redux/booksSlice"; // Import fetchBooks thunk
import Navbar from "../../shared/Navbar";
import BookListSection from "./books/BookListSection";
import AddBook from "./books/AddBook";
import BookSearch from "./books/BookSearch";

const Libshell = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch books on component mount
    dispatch(fetchBooks());
  }, [dispatch]);

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
                <BookSearch />
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
                <h2 className="text-xl font-semibold mb-4">Add a New Book</h2>
                <AddBook />
              </div>
            </div>
          </div>

          {/* Book List Section */}
          <BookListSection />
        </div>
      </div>
    </>
  );
};

export default Libshell;
