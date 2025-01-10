import React from 'react';

const AccountSummary = ({ transactions }) => {
  const totalIncome = transactions
    .filter((transaction) => transaction.category.toLowerCase() === 'income')
    .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.category.toLowerCase() === 'expense')
    .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <section className="p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Account Summary</h2>
      <div>
        <p><strong>Total Income: </strong>${totalIncome.toFixed(2)}</p>
        <p><strong>Total Expenses: </strong>${totalExpenses.toFixed(2)}</p>
        <p><strong>Net Balance: </strong>${netBalance.toFixed(2)}</p>
      </div>

      <h3 className="mt-6 text-xl font-semibold">Transaction List</h3>
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

export default AccountSummary;
