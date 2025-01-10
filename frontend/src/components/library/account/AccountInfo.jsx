import React from 'react';

const AccountInfo = ({ accountDetails }) => {
  const { userName, totalIncome, totalExpenses, netBalance, transactions } = accountDetails;

  return (
    <section className="p-4 bg-white rounded shadow mb-8">
      <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">User: {userName}</h3>
        <p><strong>Total Income: </strong>${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses: </strong>${totalExpenses.toFixed(2)}</p>
        <p><strong>Net Balance: </strong>${netBalance.toFixed(2)}</p>
      </div>

      <h3 className="text-xl font-semibold mt-6">Transaction History</h3>
      <table className="min-w-full bg-white rounded shadow mt-4">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Description</th>
            <th className="border-b px-4 py-2 text-left">Amount</th>
            <th className="border-b px-4 py-2 text-left">Category</th>
            <th className="border-b px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="border-b px-4 py-2">{transaction.description}</td>
              <td className="border-b px-4 py-2">{transaction.amount}</td>
              <td className="border-b px-4 py-2">{transaction.category}</td>
              <td className="border-b px-4 py-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AccountInfo;
