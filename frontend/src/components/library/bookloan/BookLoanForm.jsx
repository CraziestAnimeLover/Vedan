import React, { useState } from "react";

const BookLoanForm = ({ onAddLoan }) => {
  const [loan, setLoan] = useState({
    loanId: "",
    bookName: "",
    bookId: "",
    borrowerName: "",
    loanDate: "",
    dueDate: "",
    returnBook: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoan((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loan.loanId || !loan.bookName || !loan.borrowerName || !loan.loanDate) {
      alert("Please fill in all required fields.");
      return;
    }
    onAddLoan(loan);
    setLoan({
      loanId: "",
      bookName: "",
      bookId: "",
      borrowerName: "",
      loanDate: "",
      dueDate: "",
      returnBook: false,
    });
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-center mb-6">Book Loan Form</h2>
      
      <div className="mb-4">
        <label htmlFor="loanId" className="block text-gray-700 font-medium mb-2">Loan ID</label>
        <input
          type="text"
          name="loanId"
          id="loanId"
          placeholder="Enter Loan ID"
          value={loan.loanId}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="bookName" className="block text-gray-700 font-medium mb-2">Book Name</label>
        <input
          type="text"
          name="bookName"
          id="bookName"
          placeholder="Enter Book Name"
          value={loan.bookName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="bookId" className="block text-gray-700 font-medium mb-2">Book ID</label>
        <input
          type="text"
          name="bookId"
          id="bookId"
          placeholder="Enter Book ID"
          value={loan.bookId}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="borrowerName" className="block text-gray-700 font-medium mb-2">Borrower Name</label>
        <input
          type="text"
          name="borrowerName"
          id="borrowerName"
          placeholder="Enter Borrower Name"
          value={loan.borrowerName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="loanDate" className="block text-gray-700 font-medium mb-2">Loan Date</label>
        <input
          type="date"
          name="loanDate"
          id="loanDate"
          value={loan.loanDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-gray-700 font-medium mb-2">Due Date</label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={loan.dueDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="returnBook"
          id="returnBook"
          checked={loan.returnBook}
          onChange={handleChange}
          className="h-5 w-5 text-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="returnBook" className="ml-2 text-gray-700 font-medium">Return Book</label>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Loan
      </button>
    </form>
  );
};

export default BookLoanForm;
