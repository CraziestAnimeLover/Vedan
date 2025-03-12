import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/demandinventory";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchInventory();
  }, [page]);

  const fetchInventory = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    try {
      console.log(`Fetching inventory from: ${API_BASE_URL}?page=${page}`);
      const response = await axios.get(`${API_BASE_URL}?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched inventory data:", response.data);
      const inventoryData = response.data.items ?? response.data ?? [];
      
      // Flatten nested items
      const allItems = inventoryData.flatMap((entry, index) =>
        entry.items?.map((subItem, subIndex) => ({
          srNo: index + 1, // Sr. No for the main entry
          category: subItem.category,
          company: subItem.company,
          quantity: subItem.quantity,
          price: subItem.price,
          remark: subItem.remark,
          id: subItem._id, // Unique ID for each item
        })) || []
      );

      setItems(allItems);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch inventory data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Inventory Items</h2>

      {loading && <p>Loading inventory...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Sr. No</th>
                <th className="border border-gray-300 px-4 py-2">Category</th>
                <th className="border border-gray-300 px-4 py-2">Company</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Remark</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item.id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.category}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.company}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.price}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.remark}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No inventory items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button 
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <span>Page {page}</span>
        
        <button 
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InventoryPage;
