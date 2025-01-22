import React, { useState, useEffect, useRef } from "react";
import BookLoanForm from "./BookLoanForm";
import LoanCard from "./LoanCard";
import Navbar from "../../../components/shared/Navbar"
import "./index.css"; // Assuming you have a separate CSS file for any custom styles

const LoanBook = () => {
  const [loans, setLoans] = useState(() => {
    const savedLoans = localStorage.getItem("loans");
    return savedLoans ? JSON.parse(savedLoans) : [];
  });

  const [selectedLoan, setSelectedLoan] = useState(null); // Track the selected loan
  const [showAddForm, setShowAddForm] = useState(false);
  const loanListRef = useRef(null);
  const formRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("loans", JSON.stringify(loans));
  }, [loans]);

  const handleAddLoan = (loan) => {
    setLoans((prevLoans) => [...prevLoans, loan]);
  };

  // Handle loan click and display details
  const handleLoanClick = (loan) => {
    setSelectedLoan(loan);  // Set the selected loan for details view
    setShowAddForm(false);  // Hide the Add Form if a loan is selected
  };

  const scrollUp = () => {
    if (loanListRef.current) {
      loanListRef.current.scrollTop -= 100; // Adjust scroll amount as needed
    }
  };

  const scrollDown = () => {
    if (loanListRef.current) {
      loanListRef.current.scrollTop += 100; // Adjust scroll amount as needed
    }
  };

  // Close the form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowAddForm(false);
      }
      if (detailsRef.current && !detailsRef.current.contains(event.target)) {
        setSelectedLoan(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-br from-green-500 to-teal-400 min-h-screen text-white">
      <div className="container mx-auto p-6 flex">
        {/* Sidebar: Loan List */}
        <div className="w-1/4 bg-white text-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={scrollUp}
              className="text-gray-800 hover:text-gray-500 rounded w-5 bg-gray-400"
            >
              ↑
            </button>
            <button
              onClick={scrollDown}
               className="text-gray-800 hover:text-gray-500 rounded w-5 bg-gray-400"
            >
              ↓
            </button>
          </div>
          <div
            className="overflow-y-auto max-h-[400px]"
            ref={loanListRef}
          >
            <h2 className="text-2xl font-semibold mb-4">Loans</h2>
            <ul className="space-y-4">
              {loans.map((loan) => (
                <li key={loan.loanId} onClick={() => handleLoanClick(loan)}>
                  <LoanCard loan={loan} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4 pl-6 relative ">
          <button
            className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            onClick={() => setShowAddForm(true)}
          >
            Add a New Loan
          </button>
          <div className="text-center mb-10 mt-8">
            <h1 className="text-4xl font-bold"></h1>
            <p className="text-lg mt-2 text-green-200">
              
            </p>
          </div>

          {/* Conditional Rendering */}
          {selectedLoan && !showAddForm && (
            <div
              ref={detailsRef}
              className="bg-white p-8 rounded-lg shadow-lg text-gray-800"
            >
              <h2 className="text-2xl font-bold mb-4">
                Loan ID: {selectedLoan.loanId}
              </h2>
              <p><strong>Book Name:</strong> {selectedLoan.bookName}</p>
              <p><strong>Borrower Name:</strong> {selectedLoan.borrowerName}</p>
              <p><strong>Loan Date:</strong> {selectedLoan.loanDate}</p>
              <p><strong>Due Date:</strong> {selectedLoan.dueDate}</p>
              <p><strong>Return Book:</strong> {selectedLoan.returnBook ? "Yes" : "No"}</p>
            </div>
          )}

          {showAddForm && (
            <div
              ref={formRef}
              className="bg-white p-6 rounded-lg shadow-lg text-gray-800"
            >
              <h2 className="text-2xl font-bold mb-4 mt-4">Add a New Loan</h2>
              <BookLoanForm onAddLoan={handleAddLoan} />
            </div>
          )}

          {!selectedLoan && !showAddForm && (
            <div className="text-gray-300 text-center">
              {/* <p>Select a loan to view details or add a new loan.</p> */}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default LoanBook;
