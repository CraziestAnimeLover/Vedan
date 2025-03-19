import React, { useState ,useEffect } from "react";

const User = () => {
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/gym/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/gym/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, []);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const url = editingUserId
      ? `http://localhost:8000/api/gym/users/${editingUserId}`
      : "http://localhost:8000/api/gym/users";

    const method = editingUserId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      throw new Error("Invalid JSON response from server: " + text);
    }

    if (!response.ok) {
      throw new Error(data.error || "Failed to save user");
    }

    // ✅ Refresh user list
    fetchUsers();

    // ✅ Reset the form
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
    setEditingUserId(null);
  } catch (error) {
    console.error("Error saving user:", error);
    alert(error.message);
  }
};

  
 
  
  const handleEdit = (user) => {
    setFormData({
       selectedPlan: user.selectedPlan,
       name: user.name,
       phone: user.phone,
       email: user.email,
       password: "",
       confirmPassword: "",
       permissions: user.permissions || [],
    });
    setEditingUserId(user._id);
    setShowForm(true);
 };
 
  

 const handleDelete = async (id) => {
  try {
     const response = await fetch(`http://localhost:8000/api/gym/users/${id}`, {
        method: "DELETE",
     });

     if (!response.ok) {
        throw new Error("Failed to delete user");
     }

     setUsers(users.filter((user) => user._id !== id));
  } catch (error) {
     console.error("Error deleting user:", error);
  }
};

  

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md relative">
      {/* Add User Button (Top Right) */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        {showForm ? "Close Form" : "Add User"}
      </button>

      {/* Show Form When Button Clicked */}
      {showForm ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">User Registration</h2>
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
                <option value="">Select a Plan</option>
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
   {editingUserId ? "Update" : "Submit"}
</button>

          </form>
        </div>
      ) : (
        <div className="mt-6">
          {/* Show User Count */}
          {users.length > 0 && (
            <p className="text-gray-600 mb-2">Total Users: {users.length}</p>
          )}

          {/* User Cards */}
          {users.length === 0 ? (
            <p className="text-gray-500 text-center">No users added yet.</p>
          ) : (
            users.map((user, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center mb-2"
              >
                <div className="w-full">
                  {/* User Name */}
                  <h3 className="text-lg font-semibold">{user.name}</h3>

                 
                    <p><strong>Plans:</strong> {user.selectedPlan}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                 

                  {/* Row with Phone & Permissions */}
                  <div className="mt-1 text-sm text-gray-600 gap-2">
                    <p><strong >Phone:</strong> {user.phone}</p>
                    <div>
                      <strong>Permissions:</strong>
                      <div className="grid grid-cols-2 gap-2 mt-1">
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
                              checked={user.permissions.includes(perm)}
                              disabled
                            />
                            {perm}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit & Delete Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={()=>handleEdit(user)}
                    className="text-blue-600 font-bold text-lg"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}

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

export default User;
