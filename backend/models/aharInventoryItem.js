import mongoose from "mongoose";

const AharInventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  condition: { type: String, required: true },
  remark: { type: String },
  description: { type: String }, // Path for uploaded file
});

const AharInventory = mongoose.model("AharInventory", AharInventorySchema);

export default AharInventory;
