import React from "react";

const AddedItemsTable = ({ items = []}) => {
  // Calculate total price considering only the 'price' column
  const totalPrice = items.reduce((total, itm) => total + parseFloat(itm.price || 0), 0);

  return (
    <div>
      {items.length > 0 && (
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
              {items.map((itm, index) => (
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

          {/* Total Price Calculation */}
          <div className="mt-4 text-right font-semibold text-lg">
            <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddedItemsTable;
