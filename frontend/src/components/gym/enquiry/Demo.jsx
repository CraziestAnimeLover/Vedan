import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api/enquiries';

const Demo = () => {
  const [showForm, setShowForm] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [formData, setFormData] = useState({
    date: '', name: '', mobile: '', address: '', plan: '', amount: '', followUpDate: '', followUpTime: '', description: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  // Fetch enquiries on mount
  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!/^\d{10}$/.test(formData.mobile)) {
      alert('Mobile number must be 10 digits');
      return false;
    }
    if (formData.amount <= 0) {
      alert('Amount must be greater than 0');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    try {
      const method = editIndex !== null ? 'PUT' : 'POST';
      const url = editIndex !== null ? `${API_URL}/${enquiries[editIndex]._id}` : API_URL;
  
      console.log(`Making ${method} request to:`, url);
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json(); 
      console.log('Response:', responseData);
  
      if (!response.ok) throw new Error(responseData.message || 'Failed to save enquiry');
  
      await fetchEnquiries();
      resetForm();
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };
  

  const handleEdit = (index) => {
    setFormData(enquiries[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete enquiry');

      await fetchEnquiries();
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      alert('Failed to delete enquiry');
    }
  };

  const handleMark = async (enquiry) => {
    try {
      const response = await fetch('http://localhost:8000/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry),
      });
  
      const text = await response.text(); // Read raw response
      console.log("Raw Response:", text);
  
      // Try to parse JSON
      try {
        const data = JSON.parse(text);
        console.log("Parsed JSON:", data);
  
        if (!response.ok) throw new Error(data.message || "Failed to mark enquiry");
  
        alert("Enquiry marked successfully!");
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        alert("Response is not valid JSON: " + text);
      }
    } catch (error) {
      console.error("Error marking enquiry:", error.message);
      alert("Error marking enquiry: " + error.message);
    }
  };
  
  
  

  const resetForm = () => {
    setFormData({ date: '', name: '', mobile: '', address: '', plan: '', amount: '', followUpDate: '', followUpTime: '', description: '' });
    setShowForm(false);
    setEditIndex(null);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
          {showForm ? 'Close Form' : 'Add Enquiry'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow-md bg-white mb-4 grid gap-4">
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow-md bg-gray-100">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="border p-2 rounded bg-white w-full" required />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded bg-white w-full" required />
            </div>

            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
              <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="border p-2 rounded bg-white w-full" required />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded bg-white w-full" required />
            </div>

            <div>
              <label htmlFor="plan" className="block text-sm font-medium text-gray-700">Plan</label>
              <select id="plan" name="plan" value={formData.plan} onChange={handleChange} className="border p-2 rounded bg-white w-full" required>
                <option value="">Select Plan</option>
                <option value="Week Plan">Week Plan</option>
                <option value="Off Plan">Off Plan</option>
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Plan Amount</label>
              <input type="number" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="border p-2 rounded bg-white w-full" required />
            </div>

            <div>
              <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700">Follow-up Date</label>
              <input type="date" id="followUpDate" name="followUpDate" value={formData.followUpDate} onChange={handleChange} className="border p-2 rounded bg-white w-full" required />
            </div>

            <div>
              <label htmlFor="followUpTime" className="block text-sm font-medium text-gray-700">Follow-up Time</label>
              <input type="time" id="followUpTime" name="followUpTime" value={formData.followUpTime} onChange={handleChange} className="border p-2 rounded bg-white w-full" required />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Enquiry Description</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border p-2 rounded w-full bg-white mt-4" required></textarea>
          </div>

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full">
            {editIndex !== null ? 'Update Enquiry' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Demo;
