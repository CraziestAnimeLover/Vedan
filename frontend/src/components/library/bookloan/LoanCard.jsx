import React from "react";

const LoanCard = ({ loan }) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white shadow-lg rounded-lg mb-6">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Loan ID: {loan.loanId}</h3>
      <div className="mb-2">
        <p><strong className="text-gray-700">Book Name:</strong> {loan.bookName}</p>
        <p><strong className="text-gray-700">Book ID:</strong> {loan.bookId}</p>
        <p><strong className="text-gray-700">Borrower Name:</strong> {loan.borrowerName}</p>
        <p><strong className="text-gray-700">Loan Date:</strong> {loan.loanDate}</p>
        <p><strong className="text-gray-700">Due Date:</strong> {loan.dueDate || "N/A"}</p>
        <p><strong className="text-gray-700">Return Book:</strong> {loan.returnBook ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default LoanCard;
