import mongoose from "mongoose";

const GymEquipmentBillSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  currency: { type: String, required: true, default: "USD" },
  convertedPrice: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now }
});

// Prevent Mongoose from redefining the model
const GymEquipmentBill =
  mongoose.models.GymEquipmentBill || mongoose.model("GymEquipmentBill", GymEquipmentBillSchema, "gymequipmentbills");

export default GymEquipmentBill;
