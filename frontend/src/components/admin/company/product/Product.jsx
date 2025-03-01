import React, { useState } from "react";
import { FaTrash, FaPlus, FaUpload, FaFilePdf } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "", use: "", hsn: "", price: "", image: null, pdf: null },
  ]);

  // Add Product Row
  const addProduct = () => {
    setProducts([
      ...products,
      { id: products.length + 1, name: "", use: "", hsn: "", price: "", image: null, pdf: null },
    ]);
  };

  // Remove Product Row
  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Handle Input Change
  const handleInputChange = (id, field, value) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  // Handle Image Upload
  const handleImageUpload = (id, file) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, image: file } : product
      )
    );
  };

  // Handle PDF Upload
  const handlePdfUpload = (id, file) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, pdf: file } : product
      )
    );
  };

  return (
    <div className="bg-white  p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Product Details</h3>

      {/* Add Product Button */}
      <button
        onClick={addProduct}
        className="mb-4 flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        <FaPlus className="mr-2" /> Add Product
      </button>

      {/* Product Table */}
      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg ">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="border px-4 py-2">Sr. No.</th>
            <th className="border px-4 py-2">Product</th>
            <th className="border px-4 py-2">Use</th>
            <th className="border px-4 py-2">HSN Code</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Price Per Unit</th>
            <th className="border px-4 py-2">Description (PDF)</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleInputChange(product.id, "name", e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={product.use}
                  onChange={(e) => handleInputChange(product.id, "use", e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={product.hsn}
                  onChange={(e) => handleInputChange(product.id, "hsn", e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </td>
              {/* Image Upload & Preview */}
              <td className="border px-4 py-2 text-center">
                <label className="cursor-pointer text-blue-600 hover:text-blue-800 flex items-center justify-center">
                  <FaUpload className="mr-1" /> Upload
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(product.id, e.target.files[0])}
                  />
                </label>
                {product.image && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="Product"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                )}
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleInputChange(product.id, "price", e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </td>
              {/* PDF Upload & Preview */}
              <td className="border px-4 py-2 text-center">
                <label className="cursor-pointer text-red-600 hover:text-red-800 flex items-center justify-center">
                  <FaFilePdf className="mr-1" /> Upload PDF
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => handlePdfUpload(product.id, e.target.files[0])}
                  />
                </label>
                {product.pdf && (
                  <div className="mt-2">
                    <a
                      href={URL.createObjectURL(product.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      <FaFilePdf className="mr-1" /> View PDF
                    </a>
                  </div>
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
