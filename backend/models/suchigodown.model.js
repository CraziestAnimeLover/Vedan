import mongoose from "mongoose";

const SuchiGodownSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pic: { type: String }, // Store image URL or file path
  category: { type: String, required: true },
  expireDate: { type: Date },
  price: { type: Number, required: true },
  manufacturing: { type: String },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  total: { type: Number, required: true },
  description: { type: String }, // Store PDF URL or file path
}, { timestamps: true });

export default mongoose.model("SuchiGodown", SuchiGodownSchema);
