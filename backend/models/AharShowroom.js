import mongoose from "mongoose";

const AharShowroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    pic: { type: String }, // Image URL
    category: { type: String, required: true },
    expireDate: { type: Date },
    price: { type: Number, required: true },
    manufacturing: { type: String },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    description: { type: String }, // PDF File URL
  },
  { timestamps: true }
);

// ✅ Correct Model Export
export default mongoose.model("AharShowroom", AharShowroomSchema, "aharshowroom");
