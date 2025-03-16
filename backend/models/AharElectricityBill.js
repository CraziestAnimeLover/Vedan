import mongoose from "mongoose";

const electricityBillSchema = new mongoose.Schema({
  billFrom: { type: Date, required: true },
  billTo: { type: Date, required: true },
  billAmount: { type: Number, required: true },
  billDate: { type: Date, required: true },
  billUnit: { type: String, required: true },
  remark: { type: String },
  currency: { type: String, enum: ["USD", "EUR", "GBP", "INR", "JPY"], default: "USD" },
});

const ElectricityBill = mongoose.model("ElectricityBill", electricityBillSchema, "aharelectricitybill");

export default ElectricityBill;
