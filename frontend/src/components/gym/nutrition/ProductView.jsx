import React, { useState ,useEffect } from "react";
import axios from "axios"
const API_BASE_URL = "http://localhost:8000/api/gym/products";




const ProductView = () => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    imagePreview: null, // ✅ Store preview URL separately
    name: "",
    category: "",
    price: "",
    manufacturingBy: "",
    description: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

    // Fetch products from backend
    useEffect(() => {
      axios.get(API_BASE_URL)
        .then((res) => {
          console.log("Fetched Products:", res.data); // Debug response
          setProducts(res.data);
        })
        .catch((err) => console.error("Error fetching products:", err));
    }, []);
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  
    if (event.target.name === "description") {
      // Allow only PDFs for the description field
      if (file && file.type !== "application/pdf") {
        alert("Only PDF files are allowed for description!");
        return;
      }
      setFormData({ ...formData, description: file });
    } else {
      // Handle image file upload
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        setFormData({ ...formData, image: file, imagePreview: imageUrl });
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("manufacturingBy", formData.manufacturingBy);

    if (formData.image) formDataToSend.append("image", formData.image);
    if (formData.description) formDataToSend.append("description", formData.description);

    console.log("FormData values:");
    for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
    }

    try {
        const response = editingIndex !== null
            ? await axios.put(`${API_BASE_URL}/${products[editingIndex]._id}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            : await axios.post(API_BASE_URL, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

        console.log("Server response:", response.data);
        
        const { data } = await axios.get(API_BASE_URL);
        setProducts(data);
    } catch (error) {
        console.error("Error submitting product:", error);
    }

    setShowForm(false);
    setFormData({
        image: null,
        imagePreview: null,
        name: "",
        category: "",
        price: "",
        manufacturingBy: "",
        description: null,
    });
    setImagePreview(null);
    setEditingIndex(null);
};



  const handleEdit = (index) => {
    const product = products[index];
    setFormData({
      ...product,
      description: product.description ? `http://localhost:8000/${product.description}` : null, 
      imagePreview: product.image ? `http://localhost:8000/uploads/${product.image}` : null, 
    });
    setEditingIndex(index);
    setShowForm(true);
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingIndex(null);
            setImagePreview(null);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          {showForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded-lg shadow-md bg-white mb-4 grid gap-4"
        >
          <div className="grid grid-flow-col gap-4 mt-4">
            <label className="flex flex-col items-center cursor-pointer">
              
              <div className="w-40 h-40 bg-gray-200 rounded flex items-center justify-center overflow-hidden border border-gray-300">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">Click to add image</span>
                )}
              </div>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <div className="grid grid-row gap-2">
              <label>
                Product Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="border p-2 rounded bg-white w-full"
                  required
                />
              </label>

              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="border p-2 rounded bg-white w-full"
                  required
                />
              </label>

              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="border p-2 rounded bg-white w-full"
                  required
                />
              </label>

              <label>
                Manufacturing By:
                <input
                  type="text"
                  name="manufacturingBy"
                  value={formData.manufacturingBy}
                  onChange={handleChange}
                  placeholder="Manufacturing By"
                  className="border p-2 rounded bg-white w-full"
                  required
                />
              </label>
            </div>
          </div>

          <label className="flex flex-col">
  Description (PDF only):
  <input
    type="file"
    name="description"
    onChange={handleFileChange}
    accept="application/pdf" // ✅ This ensures only PDFs can be selected
    className="border p-2 rounded bg-white"
    required={!editingIndex}
  />
</label>
{formData.description && (
  <p className="text-sm text-gray-600 mt-2">
    Selected File: {formData.description.name}
  </p>
)}
{/* Show selected PDF file name */}
{formData.description && (
  <p className="text-sm text-gray-600 mt-2">
    Selected File: {formData.description.name}
  </p>
)}


          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            {editingIndex !== null ? "Update" : "Submit"}
          </button>
        </form>
      ) : (
        <div className="grid gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow-md bg-gray-100"
            >
              {/* ✅ Use stored imagePreview instead of recreating URL */}
              {product.image && (
 <img
 src={`http://localhost:8000/uploads/${product.image}`}
 alt={product.name}
 className="w-40 h-40 mx-14 object-cover rounded"
 onError={(e) => e.target.style.display = "none"} // Hides broken images
/>

)}


              <div className="mt-4">
                <h3 className="font-bold text-lg mt-2">{product.name}</h3>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <strong>Manufacturing By:</strong> {product.manufacturingBy}
                </p>
              </div>
              <p className="mx-14">
  <strong>Description:</strong>{" "}
  {product.description ? (
    <a
      href={typeof product.description === "string" ? product.description : URL.createObjectURL(product.description)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline"
    >
      View PDF
    </a>
  ) : (
    "No description available"
  )}
</p>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
  onClick={() => handleDelete(product._id)}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Delete
</button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductView;
