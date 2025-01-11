import React, { useState } from "react";
import axios from "axios";
import { LIBRARY_API_END_POINT } from "../../../../utils/constant.js";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    isbn: "",
    series: "",
    publisherDate: "",
    format: "Paper Book",
    language: "English",
    price: "",
    quantity: "",
    pages: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on submit
    setSuccess(false); // Reset success message

    try {
      const response = await axios.post(`${LIBRARY_API_END_POINT}/books`, bookData);
      console.log("Book added:", response.data);
      setSuccess(true); // Display success message
    } catch (error) {
      console.error("Error adding book:", error);
      setError("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add a New Book</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            placeholder="Enter genre"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="series">Series</label>
          <select
            className="border p-2 rounded-lg w-full"
            value={bookData.series}
            onChange={(e) => setBookData({ ...bookData, series: e.target.value })}
          >
            <option value="Ast">Ast</option>
            <option value="Children's Book">Children's Book</option>
            <option value="Comic">Comic</option>
            <option value="Education">Education</option>
            <option value="History">History</option>
            <option value="Literature">Literature</option>
            <option value="Social">Social</option>
            <option value="Social Science">Social Science</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="publisherDate">Publisher Date</label>
          <input
            type="date"
            id="publisherDate"
            name="publisherDate"
            value={bookData.publisherDate}
            onChange={handleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="format">Format</label>
          <select
            className="border p-2 rounded-lg w-full"
            value={bookData.format}
            onChange={(e) => setBookData({ ...bookData, format: e.target.value })}
          >
            <option value="Paper Book">Paper Book</option>
            <option value="Hardcover">Hardcover</option>
            <option value="Pocket Book">Pocket Book</option>
            <option value="Ebook">Ebook</option>
            <option value="Audio">Audio</option>
            <option value="CD">CD</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="language">Language</label>
          <input
            type="text"
            id="language"
            name="language"
            value={bookData.language}
            onChange={handleChange}
            placeholder="Enter language"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={bookData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700" htmlFor="pages">Pages</label>
          <input
            type="number"
            id="pages"
            name="pages"
            value={bookData.pages}
            onChange={handleChange}
            placeholder="Enter number of pages"
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Add Book
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      {success && <p className="mt-4 text-green-600 text-center">Book added successfully!</p>}
    </div>
  );
};

export default AddBook;
