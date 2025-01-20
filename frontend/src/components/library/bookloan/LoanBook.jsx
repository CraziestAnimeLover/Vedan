import React, { useState,useEffect } from "react";
import BookLoanForm from "./BookLoanForm";
import LoanCard from "./LoanCard";
import "./index.css"; // Assuming you have a separate CSS file for any custom styles

const LoanBook = () => {
  const [loans, setLoans] = useState(() => {
    const savedLoans = localStorage.getItem("loans");
    return savedLoans ? JSON.parse(savedLoans) : [];
  });


  useEffect(() => {
    localStorage.setItem("loans", JSON.stringify(loans));
  }, [loans]);


  
  const handleAddLoan = (loan) => {
    setLoans((prevLoans) => [...prevLoans, loan]);
  };
  

  return (
    <div className="app-container max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Book Loan System</h1>
      
      {/* Book Loan Form */}
      <div className="mb-8">
        <BookLoanForm onAddLoan={handleAddLoan} />
      </div>

      {/* Loans List */}
      <div className="loan-list mb-8">
        <h2 className="text-2xl font-semibold mb-4">Loans</h2>
        <ul className="space-y-4">
          {loans.map((loan) => (
            <li key={loan.loanId}>
              <LoanCard loan={loan} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LoanBook;
