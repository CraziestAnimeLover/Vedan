import mongoose from "mongoose";

const AharShowroomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    pic: { type: String }, // Image URL
    category: { type: mongoose.Schema.Types.ObjectId, ref: "AharCategory", required: true },
    expireDate: { type: Date },
    price: { type: Number, required: true, min: 0 },
    manufacturing: { type: String, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, enum: ["KG", "L", "PCS", "Box", "Other"] },
    total: { type: Number, required: true },
    description: { type: String }, // PDF File URL
  },
  { timestamps: true }
);

// Indexing for faster queries on category
AharShowroomSchema.index({ category: 1 });

export default mongoose.model("AharShowroom", AharShowroomSchema, "aharshowroom");
