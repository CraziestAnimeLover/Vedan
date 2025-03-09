import React, { useState } from "react";

const Dainik = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    id: "",
    items: [],
  });

  const [item, setItem] = useState({ category: "", company: "", quantity: "", price: "", remark: "" });
  const [submittedData, setSubmittedData] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    if (!item.category || !item.company || !item.quantity || !item.price) {
      alert("Please fill all required item fields.");
      return;
    }

    setFormData({ ...formData, items: [...formData.items, item] });
    setItem({ category: "", company: "", quantity: "", price: "", remark: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }
    setSubmittedData(formData);
    setFormData({ date: "", time: "", name: "", id: "", items: [] });
  };

  // Calculate the total price (only for the price column)
  const totalPrice = formData.items.reduce((total, itm) => {
    return total + parseFloat(itm.price || 0);
  }, 0);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Daily Inventory Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* General Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} required 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium">Time:</label>
            <input type="time" name="time" value={formData.time} onChange={handleInputChange} required 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium">Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
          </div>

          <div>
            <label className="block text-sm font-medium">ID:</label>
            <input type="text" name="id" value={formData.id} onChange={handleInputChange} required 
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
          </div>
        </div>

        {/* Items Section */}
        <h3 className="text-lg font-semibold">Items</h3>
        <div className="grid grid-cols-3 gap-4">
          <input type="text" name="category" placeholder="Category" value={item.category} onChange={handleItemChange} required
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
          <input type="text" name="company" placeholder="Company" value={item.company} onChange={handleItemChange} required
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
          <input type="number" name="quantity" placeholder="Quantity" value={item.quantity} onChange={handleItemChange} min="1" required
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
          <input type="number" name="price" placeholder="Price" value={item.price} onChange={handleItemChange} min="1" required
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
          <input type="text" name="remark" placeholder="Remark (optional)" value={item.remark} onChange={handleItemChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
          <button type="button" onClick={addItem}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
            Add Item
          </button>
        </div>

        {/* Display Added Items */}
        {formData.items.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mt-4">Added Items:</h4>
            <table className="min-w-full bg-white border rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-sm font-medium text-gray-600 border-b">Sr. No</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600 border-b">Category</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600 border-b">Company</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600 border-b">Quantity</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600 border-b">Price</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-600 border-b">Remark</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((itm, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-700">{index + 1}</td>
                    <td className="p-3 text-sm text-gray-700">{itm.category}</td>
                    <td className="p-3 text-sm text-gray-700">{itm.company}</td>
                    <td className="p-3 text-sm text-gray-700">{itm.quantity}</td>
                    <td className="p-3 text-sm text-gray-700">{itm.price}</td>
                    <td className="p-3 text-sm text-gray-700">{itm.remark}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Price (Price column total) */}
            <div className="mt-4 text-right font-semibold text-lg">
              <p>Total Price (Price Column): ₹{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Dainik;
