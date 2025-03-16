import mongoose from "mongoose";

const AharEquipmentBillSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true, default: "USD" },
  convertedPrice: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now }
});

const EquipmentBill = mongoose.model("EquipmentBill", AharEquipmentBillSchema , "aharequipmentbills");
export default EquipmentBill;
