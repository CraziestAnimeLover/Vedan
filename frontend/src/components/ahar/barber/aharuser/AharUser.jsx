import React, { useState, useEffect } from "react";

const AharUser = () => {
  const [formData, setFormData] = useState({
    selectedPlan: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    permissions: [],
  });

  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      permissions: checked
        ? [...prevData.permissions, value]
        : prevData.permissions.filter((item) => item !== value),
    }));
  };

  // Validate form data before submission
  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      return "All fields are required!";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match!";
    }
    if (!formData.selectedPlan) {
      return "Please select a plan!";
    }
    return ""; // No errors
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/ahar/users");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch users");
        }
        setUsers((prevUsers) => [...prevUsers, { ...data, _id: data._id || Date.now() }]);

      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchUsers();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    try {
      const response = await fetch('http://localhost:8000/api/ahar/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to create user: ${data.error || 'Unknown error'}`);
      }
  
      setSuccessMessage("User created successfully!");
  
      // Fetch updated users list after submission
      const updatedUsers = await fetch("http://localhost:8000/api/ahar/users").then((res) => res.json());
      setUsers(updatedUsers);
  
      // Reset form
      setFormData({
        selectedPlan: "",
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        permissions: [],
      });
  
    } catch (error) {
      setError(error.message);
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/ahar/users/${id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers((prev) => prev.filter((user) => user._id !== id));
      setSuccessMessage("User deleted successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditingUserId(user._id);
    setShowForm(true);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingUserId(null);
          setFormData({
            selectedPlan: "",
            name: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            permissions: [],
          });
        }}
        className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        {showForm ? "Close Form" : "Add User"}
      </button>

      {error && <p className="text-red-600 mt-2">{error}</p>}
      {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">
            {editingUserId ? "Edit User" : "User Registration"}
          </h2>

          <div>
            <label className="block font-medium">Selected Plan</label>
            <select
              name="selectedPlan"
              value={formData.selectedPlan}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select User Type</option>
              <option value="Admin">Admin</option>
              <option value="Operator">Operator</option>
            </select>
          </div>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Name"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Email"
            required
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Phone"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter Password"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Confirm Password"
            required
          />

          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {editingUserId ? "Update User" : "Submit"}
          </button>
        </form>
      ) : (
        users.map((user,index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center mb-2">
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p><strong>Plan:</strong> {user.selectedPlan}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(user)} className="text-blue-600">✏️</button>
              <button onClick={() => handleDelete(user._id)} className="text-red-600">❌</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AharUser;
