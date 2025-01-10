import React, { useState } from 'react';
import InputForm from './InputForm';
import AccountForm from './AccountForm';
import TransactionForm from './TransactionForm';
import AccountSummary from './AccountSummary';
import AccountInfo from './AccountInfo';

const Account = () => {
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [services, setServices] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [userDetails] = useState({ userName: 'John Doe' });

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const addPlan = (plan) => {
    setPlans([...plans, plan]);
  };

  const addService = (service) => {
    setServices([...services, service]);
  };

  const addDiscount = (discount) => {
    setDiscounts([...discounts, discount]);
  };

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  // Calculate Total Income, Total Expenses, and Net Balance
  const totalIncome = transactions
    .filter((transaction) => transaction.category.toLowerCase() === 'income')
    .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.category.toLowerCase() === 'expense')
    .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  const accountDetails = {
    userName: userDetails.userName,
    totalIncome,
    totalExpenses,
    netBalance,
    transactions,
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Library Management System</h1>
      
      {/* Input Form for Adding Users */}
      <InputForm onAddUser={addUser} />

      {/* Account Form for Plans, Services, and Discounts */}
      <AccountForm onAddPlan={addPlan} onAddService={addService} onAddDiscount={addDiscount} />

      {/* Transaction Form for Adding Transactions */}
      <TransactionForm onAddTransaction={handleAddTransaction} />

      {/* Account Summary showing transaction details */}
      <AccountSummary transactions={transactions} />

      {/* Account Information showing user account balance details */}
      <AccountInfo accountDetails={accountDetails} />
    </div>
  );
};

export default Account;
