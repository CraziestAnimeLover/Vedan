import mongoose from "mongoose";

const GymInventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  condition: { type: String, required: true },
  remark: { type: String },
  description: { type: String }, // Path for uploaded file
});

const GymInventory = mongoose.model("GymInventory", GymInventorySchema , "gyminventory");

export default GymInventory;
