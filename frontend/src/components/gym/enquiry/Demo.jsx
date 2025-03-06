import React, { useState } from 'react';

const Demo = () => {
  const [showForm, setShowForm] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [formData, setFormData] = useState({
    date: '', name: '', mobile: '', address: '', plan: '', amount: '', followUpDate: '', followUpTime: '', description: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedEnquiries = enquiries.map((enquiry, index) => index === editIndex ? formData : enquiry);
      setEnquiries(updatedEnquiries);
      setEditIndex(null);
    } else {
      setEnquiries([...enquiries, formData]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(enquiries[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setEnquiries(enquiries.filter((_, i) => i !== index));
  };

  const handleMark = async (enquiry) => {
    try {
      const response = await fetch('https://your-backend-api.com/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry),
      });
      if (response.ok) {
        alert('Enquiry marked and sent to backend successfully!');
      } else {
        alert('Failed to mark enquiry');
      }
    } catch (error) {
      console.error('Error marking enquiry:', error);
      alert('Error marking enquiry');
    }
  };

  const resetForm = () => {
    setFormData({ date: '', name: '', mobile: '', address: '', plan: '', amount: '', followUpDate: '', followUpTime: '', description: '' });
    setShowForm(false);
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

      <div className="grid gap-4">
        {enquiries.map((enquiry, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow-md bg-gray-100">
            <h3 className="font-bold text-lg">{enquiry.name}</h3>
            <p><strong>Date:</strong> {enquiry.date}</p>
            <p><strong>Mobile:</strong> {enquiry.mobile}</p>
            <p><strong>Address:</strong> {enquiry.address}</p>
            
            <p><strong>Follow-up:</strong> {enquiry.followUpDate} at {enquiry.followUpTime}</p>
            
            <div className="flex gap-2 mt-8 ">
              <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              <button onClick={() => handleMark(enquiry)} className="bg-blue-500 text-white px-3 py-1 rounded">Mark</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Demo;
