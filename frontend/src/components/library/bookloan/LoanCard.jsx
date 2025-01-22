import React from "react";

const LoanCard = ({ loan, onEdit, onDelete }) => {
  const isOverdue = loan.dueDate && new Date(loan.dueDate) < new Date();

  return (
    <div
      className={`p-6 max-w-sm mx-auto shadow-lg rounded-lg mb-6 ${
        isOverdue ? "bg-red-100" : "bg-white"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-700 mb-4 cursor-pointer" >Loan ID: {loan.loanId}</h3>
      {/* <div className="mb-2">
        <p><strong className="text-gray-700">Book Name:</strong> {loan.bookName}</p>
        {loan.bookId && <p><strong className="text-gray-700">Book ID:</strong> {loan.bookId}</p>}
        <p><strong className="text-gray-700">Borrower Name:</strong> {loan.borrowerName}</p>
        <p><strong className="text-gray-700">Loan Date:</strong> {loan.loanDate}</p>
        <p><strong className="text-gray-700">Due Date:</strong> {loan.dueDate || "N/A"}</p>
        <p>
          <strong className="text-gray-700">Return Book:</strong>
          <span className={`ml-2 font-semibold ${loan.returnBook ? "text-green-500" : "text-red-500"}`}>
            {loan.returnBook ? "Yes" : "No"}
          </span>
        </p>
        {isOverdue && (
          <p className="text-red-500 font-bold mt-2">Overdue</p>
        )}
      </div> */}
      {/* <div className="flex space-x-4 mt-4">
        <button
          onClick={() => onEdit(loan.loanId)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(loan.loanId)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div> */}
    </div>
  );
};

export default LoanCard;
