import React, { useState } from "react";

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
  const [editingIndex, setEditingIndex] = useState(null); // Track which user is being edited

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // If editing, update user
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = formData;
      setUsers(updatedUsers);
      setEditingIndex(null); // Reset editing state
    } else {
      // If adding new user
      setUsers([...users, formData]);
    }

    setFormData({
      selectedPlan: "",
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      permissions: [],
    });
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleEdit = (index) => {
    setFormData(users[index]); // Load existing user data into form
    setEditingIndex(index);
    setShowForm(true); // Open form for editing
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingIndex(null); // Reset edit mode when opening new form
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

      {showForm ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {editingIndex !== null ? "Edit User" : "User Registration"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label className="block font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Name"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Phone Number"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Email"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Password"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Confirm Password"
                required
              />
            </div>

            <div>
              <label className="block font-medium">Permissions</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Nutrition (Diet)",
                  "Enquiry",
                  "Enrollment (Member)",
                  "Exercise",
                  "Record",
                  "Invoice",
                  "Notice",
                  "Package",
                  "SMS",
                  "Accounts",
                  "Trainer",
                  "User",
                ].map((perm) => (
                  <label key={perm} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={perm}
                      checked={formData.permissions.includes(perm)}
                      onChange={handleCheckboxChange}
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              {editingIndex !== null ? "Update User" : "Submit"}
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-6">
          {users.length > 0 && (
            <p className="text-gray-600 mb-2">Total Users: {users.length}</p>
          )}

          {users.length === 0 ? (
            <p className="text-gray-500 text-center">No users added yet.</p>
          ) : (
            users.map((user, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center mb-2"
              >
                <div className="w-full">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p><strong>Plans:</strong> {user.selectedPlan}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <div>
                    <strong>Permissions:</strong>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {user.permissions.map((perm) => (
                        <span key={perm} className="text-sm text-gray-600">
                          ✅ {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 font-bold text-lg"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 font-bold text-lg"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AharUser;
