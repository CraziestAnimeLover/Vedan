import mongoose from "mongoose";

const gymelectricityBillSchema = new mongoose.Schema({
  billFrom: { type: Date, required: true },
  billTo: { type: Date, required: true },
  billAmount: { type: Number, required: true },
  billDate: { type: Date, required: true },
  billUnit: { type: String, required: true },
  remark: { type: String },
  currency: { type: String, enum: ["USD", "EUR", "GBP", "INR", "JPY"], default: "USD" },
});

const GymElectricityBill = mongoose.model("GymElectricityBill", gymelectricityBillSchema, "gymelectricitybill");

export default GymElectricityBill;
