import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookSearch = ({ searchTerm, setSearchTerm }) => {
  const [searchResults, setSearchResults] = useState([]); // Make sure this is an array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm.trim() === '') {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/api/books?search=${searchTerm}`);
        console.log(response.data); // Log to check the response structure
        if (Array.isArray(response.data)) {
          setSearchResults(response.data); // Set the results if it's an array
        } else {
          setError('Invalid response format from the server.');
        }
      } catch (err) {
        setError('Failed to fetch books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search books..."
        className="border p-2 rounded-lg w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      
      <ul>
        {Array.isArray(searchResults) ? (
          searchResults.map((book, index) => (
            <li key={index}>{book.title} by {book.author}</li>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </ul>
    </div>
  );
};

export default BookSearch;
