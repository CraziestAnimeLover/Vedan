import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    manufacturingBy: { type: String, required: true },
    image: { type: String, required: false }, // Image file path
    description: { type: String, required: false }, // PDF file path
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema ,"gymproduct");
export default Product;
