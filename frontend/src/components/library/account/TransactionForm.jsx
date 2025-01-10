import React, { useState } from 'react';

const TransactionForm = ({ onAddTransaction }) => {
  const [transactionData, setTransactionData] = useState({
    description: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({
      ...transactionData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionData.description && transactionData.amount && transactionData.category && transactionData.date) {
      onAddTransaction(transactionData);
      setTransactionData({ description: '', amount: '', category: '', date: '' });
    } else {
      alert('All fields are required');
    }
  };

  return (
    <section className="p-4 bg-white rounded shadow mb-8">
      <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          value={transactionData.description}
          onChange={handleInputChange}
          placeholder="Transaction Description"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          name="amount"
          value={transactionData.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={transactionData.category}
          onChange={handleInputChange}
          placeholder="Category (e.g., Income, Expense)"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={transactionData.date}
          onChange={handleInputChange}
          className="block w-full mb-2 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Transaction
        </button>
      </form>
    </section>
  );
};

export default TransactionForm;
