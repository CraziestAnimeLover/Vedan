import React, { useState } from 'react';

const InputForm = ({ onAddUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = () => {
    if (username && email && password) {
      onAddUser({ username, email, password });
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <section className="mb-8 p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add User Account</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-2 p-2 border rounded"
      />
      <button
        onClick={handleAddUser}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add User
      </button>
    </section>
  );
};

export default InputForm;
