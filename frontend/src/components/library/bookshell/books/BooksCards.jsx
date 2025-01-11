import React from 'react'

const BooksCards = () => {
  return (
    <div>
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
  )
}

export default BooksCards
