import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const BooksTable = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  // Fetch loan data from backend
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/loans");
        setLoans(response.data.loans);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch loans");
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  // Check if the table has scrollable content
  useEffect(() => {
    const checkScrollability = () => {
      if (tableRef.current) {
        setShowScrollButtons(tableRef.current.scrollHeight > tableRef.current.clientHeight);
      }
    };

    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [loans]);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Returns a formatted date like "2/19/2025"
  };

  // Handle input change for editable fields
  const handleInputChange = (id, field, value) => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan._id === id ? { ...loan, [field]: value } : loan
      )
    );
  };

  return (
    <div className="relative border rounded-md shadow-md overflow-hidden p-2">
    

      {/* Scrollable Table */}
      <div ref={tableRef} className="max-h-[300px] overflow-auto border rounded-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2 text-center">Sr. No.</th>
              <th className="border px-4 py-2 text-center">Book Name</th>
              <th className="border px-4 py-2 text-center">Loan ID</th>
              <th className="border px-4 py-2 text-center">Issue Date</th>
              <th className="border px-4 py-2 text-center">Return Date</th>
              <th className="border px-4 py-2 text-center">Return Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={loan._id}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="text"
                    value={loan.bookName}
                    onChange={(e) => handleInputChange(loan._id, "bookName", e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-center"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="text"
                    value={loan.loanId}
                    onChange={(e) => handleInputChange(loan._id, "loanId", e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-center"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="date"
                    value={loan.loanDate.slice(0, 10)} // Format date to "YYYY-MM-DD"
                    onChange={(e) => handleInputChange(loan._id, "loanDate", e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-center"
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <input
                    type="date"
                    value={loan.dueDate.slice(0, 10)} // Format date to "YYYY-MM-DD"
                    onChange={(e) => handleInputChange(loan._id, "dueDate", e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-center"
                  />
                </td>
                <td className={`border px-4 py-2 text-center ${loan.returnBook ? "text-green-500" : "text-red-500"}`}>
                  {loan.returnBook ? "Returned" : "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BooksTable;
